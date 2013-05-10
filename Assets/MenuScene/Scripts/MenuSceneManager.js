#pragma strict

var board : GameObject;
var menu : GameObject;

function Start () {
	SendMessage("fadeIn");
}

function Update () {
	if(Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began) {
		var ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
		var hit : RaycastHit;
		if(Physics.Raycast(ray, hit, 1000)) {
			hit.transform.renderer.material.color = Color.yellow;
			switch(hit.transform.tag) {
				case "server":
					break;
				case "client":
					board.SendMessage("ShowRoomList");
					break;
				case "quit":
					SendMessage("fadeOut");
					Application.Quit();
				default:
					break;
			}
		}
	}
}

function OnGUI() {
	if(GUI.Button(Rect(10, 10, 120, 50), "Test button 1")) {
		board.SendMessage("ShowRoomList");
	}
	if(GUI.Button(Rect(10, 70, 120, 50), "Test button 2")) {
		board.SendMessage("HideRoomList");
	}
}
