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
	}
	
	if(boardState=="rising" && !animation.isPlaying) {
		Destroy(blackScreen);
		Camera.main.SendMessage("ResetMenu");
		boardState = "hidden";
	}
}

function ShowBoard() {
	if(boardState == "showing") return;
	blackScreen = Instantiate(blackScreenPrefab);
	animation.Play("WaitBoardDown");
	boardState = "falling";
}

function HideBoard() {
	if(boardState == "hidden") return;
	Destroy(hourglass);
	animation.Play("WaitBoardUp");
}
