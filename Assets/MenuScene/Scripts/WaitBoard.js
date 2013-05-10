#pragma strict

var hourglassPrefab : GameObject;
var blackScreenPrefab : GameObject;

private var hourglass : GameObject;
private var blackScreen : GameObject;
private var boardState : String; // hidden, falling, showing, rising

function Start() {
	boardState = "hidden";
}

function Update() {
	if(boardState=="falling" && !animation.isPlaying) {
		hourglass = Instantiate(hourglassPrefab);
		boardState = "showing";
		Camera.main.SendMessage("BeginWaiting");
	}
	
	if(boardState=="rising" && !animation.isPlaying) {
		Destroy(blackScreen);
		Camera.main.SendMessage("ResetMenu");
		boardState = "hidden";
	}
	
	if(boardState=="showing" && Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began) {
		var ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
		var hit : RaycastHit;
		if(Physics.Raycast(ray, hit, 1000)) {
			var hitTransform = hit.transform;
			if(hitTransform == blackScreen.transform) HideBoard();
		}
	}
}

function ShowBoard() {
	if(boardState == "showing") return;
	blackScreen = Instantiate(blackScreenPrefab);
	animation.Play("WaitBoardDown");
	boardState = "falling";
}

function HideBoard() {
	Camera.main.SendMessage("StopWaiting");
	if(boardState == "hidden") return;
	Destroy(hourglass);
	animation.Play("WaitBoardUp");
	boardState = "rising";
}

function ConnectionBuilt(opponent : String) {
	
}
