#pragma strict

var board : GameObject;
var menu : GameObject;

private var isDown : boolean;

function Start () {
	isDown = false;
	SendMessage("fadeIn");
}

function Update () {
	if(Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began) {
		var ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
		var hit : RaycastHit;
		if(Physics.Raycast(ray, hit, 1000)) {
			switch(hit.transform.tag) {
				case "server":
					break;
				case "client":
					// Debug.Log("\"Search Room\" is pressed");
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
	if(GUI.Button(Rect(10, 10, 120, 50), "Test button")) {
		if(isDown) {
			board.SendMessage("HideRoomList");
		}
		else {
			board.SendMessage("ShowRoomList");
		}
		isDown = !isDown;
	}
}
