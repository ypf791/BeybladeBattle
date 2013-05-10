#pragma strict

var board : GameObject;
var wait : GameObject;
var menu : GameObject;

private var pressedMenuItem : Transform;
private var isMenuPressed : boolean;

function Start () {
	SendMessage("fadeIn");
	isMenuPressed = false;
}

function Update () {
	if(Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began) {
		var ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
		var hit : RaycastHit;
		if(!isMenuPressed && Physics.Raycast(ray, hit, 1000)) {
			pressedMenuItem = hit.transform;
			pressedMenuItem.renderer.material.color = Color.yellow;
			isMenuPressed = true;
			switch(pressedMenuItem.tag) {
				case "server" : break;
				case "client" : board.SendMessage("ShowRoomList");
								break;
				case "quit"   : SendMessage("fadeOut");
								Application.Quit();
				default       :	break;
			}
		}
	}
}
//*
function ResetMenu() {
	pressedMenuItem.renderer.material.color = Color.white;
	isMenuPressed = false;
}
//*/
//*
function OnGUI() {
	if(GUI.Button(Rect(10, 10, 120, 50), "Test button 1")) {
		board.SendMessage("ShowRoomList");
	}
	if(GUI.Button(Rect(10, 70, 120, 50), "Test button 2")) {
		board.SendMessage("HideRoomList");
	}
	if(GUI.Button(Rect(10, 130, 120, 50), "Test button 3")) {
		wait.SendMessage("ShowBoard");
	}
	if(GUI.Button(Rect(10, 190, 120, 50), "Test button 4")) {
		wait.SendMessage("HideBoard");
	}
}
//*/