#pragma strict

var board : GameObject;
var wait : GameObject;
var menu : GameObject;
var title : GameObject;
var gyro1 : GameObject;
var gyro2 : GameObject;
var select : GameObject;

private var pressedMenuItem : Transform;
private var isMenuPressed : boolean;
private var sceneState : String; // normal, transform, move, choose
private var selection : boolean; // true as right; false as left

function Start () {
	SendMessage("fadeIn");
	isMenuPressed = false;
	sceneState = "normal";
	selection = true;
}

function Update () {
	if(sceneState == "transform" && !menu.animation.isPlaying && !menu.animation.isPlaying) {
		Destroy(title);
		Destroy(menu);
		animation.Play();
		gyro2.GetComponent(Animator).SetBool("open", true);
		sceneState = "move";
	}
	
	if(sceneState == "move" && !animation.isPlaying) {
		select.SetActive(true);
		sceneState = "choose";
	}
	
	if(Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began) {
		var ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
		var hit : RaycastHit;
		var isRayCast = Physics.Raycast(ray, hit, 1000);
		
		if(sceneState=="choose") {
			if(!isRayCast) {
				selection = !selection;
				select.animation.Play(selection ? "SelectFrameShiftRight" : "SelectFrameShiftLeft");
				gyro1.GetComponent(Animator).SetBool("open", !selection);
				gyro2.GetComponent(Animator).SetBool("open", selection);
			}
			else {
				select.renderer.material.color = Color.red;
				var param = new GameObject();
				param.tag = "paramBetweenScene";
				param.name = selection ? "gyro2" : "gyro1";
				DontDestroyOnLoad(param);
				Application.LoadLevel(1);
			}
		}
		else if(!isMenuPressed && isRayCast) {
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

function ResetMenu() {
	SendMessage("CheckConnected");
	pressedMenuItem.renderer.material.color = Color.white;
	isMenuPressed = false;
}
/*
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