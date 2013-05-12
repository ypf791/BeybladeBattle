#pragma strict

var board : GameObject;
var wait : GameObject;
var menu : GameObject;
var title : GameObject;
var gyro1 : GameObject;
var gyro2 : GameObject;

private var pressedMenuItem : Transform;
private var isMenuPressed : boolean;
private var sceneState : String; // normal, transform, choose

function Start () {
	SendMessage("fadeIn");
	isMenuPressed = false;
	sceneState = "normal";
}

function Update () {
	if(sceneState == "transform" && !menu.animation.isPlaying && !menu.animation.isPlaying) {
		Destroy(title);
		Destroy(menu);
		animation.Play();
		gyro2.GetComponent(Animator).SetBool("open", true);
		sceneState = "choose";
	}
	
	if(Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began) {
		var ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
		var hit : RaycastHit;
		if(!isMenuPressed && Physics.Raycast(ray, hit, 1000)) {
			pressedMenuItem = hit.transform;
			pressedMenuItem.renderer.material.color = Color.yellow;
			isMenuPressed = true;
			switch(pressedMenuItem.tag) {
				case "server" : wait.SendMessage("ShowBoard");
								break;
				case "client" : board.SendMessage("ShowRoomList");
								break;
				case "quit"   : SendMessage("fadeOut");
								Application.Quit();
				default       :	break;
			}
		}
	}
}

function SwitchScene() {
	Destroy(board);
	Destroy(wait);
	menu.animation.Play("MenuUp");
	title.animation.Play();
	sceneState = "transform";
}
//*
function ResetMenu() {
	SendMessage("CheckConnected");
	pressedMenuItem.renderer.material.color = Color.white;
	isMenuPressed = false;
}
//*/
/*
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
	if(GUI.Button(Rect(10, 250, 120, 50), "Test button 5")) {
		SendMessage("Pause");
	}
}
//*/
//*
function OnGUI() {
	if(GUI.Button(Rect(10, 10, 120, 50), "Test")) {
		wait.SendMessage("ShowBoard");
	}
	if(GUI.Button(Rect(10, 70, 120, 50), "Choose gyro 1")) {
		gyro2.GetComponent(Animator).SetBool("open", false);
		gyro1.GetComponent(Animator).SetBool("open", true);
	}
	if(GUI.Button(Rect(10, 130, 120, 50), "Choose gyro 2")) {
		gyro2.GetComponent(Animator).SetBool("open", true);
		gyro1.GetComponent(Animator).SetBool("open", false);
	}
}
//*/