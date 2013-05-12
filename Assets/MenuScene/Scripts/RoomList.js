#pragma strict

var listItemPrefab : GameObject;
var blackScreenPrefab : GameObject;
var refreshPrefab : GameObject;
var hourglassPrefab : GameObject;

private var blackScreen : GameObject;
private var refreshButton : GameObject;
private var hourglass : GameObject;

private var listItem : GameObject[];
private var listString : String[];
private var listState : String;	// closed, closing, open, opening, refreshing, waiting

private var isRefreshing : boolean;


// Initialization of private booleans and arraies
function Start() {
	listState = "closed";
	listString = [];
	listItem = [];
}

function Update() {
	if(listState=="opening" && !animation.isPlaying) {
		ShowRoomListText();
		refreshButton = Instantiate(refreshPrefab);
		listState = "open";
	}
	
	if(listState=="closing" && !animation.isPlaying) {
		Destroy(blackScreen);
		Camera.main.SendMessage("ResetMenu");
		listState = "closed";
	}
	
	if(listState=="refreshing" && !refreshButton.animation.isPlaying) {
		ShowRoomListText();
		listState = "open";
	}
	
	if(listState=="open" && Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began) {
		var ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
		var hit : RaycastHit;
		if(Physics.Raycast(ray, hit, 1000)) {
			var hitTransform = hit.transform;
			if(hitTransform == refreshButton.transform) {
				RefreshRoomList();
			}
			else if(hitTransform !== blackScreen.transform) {
				for(var i=0; i<listItem.Length; ++i) {
					if(hitTransform == listItem[i].transform) {
						Camera.main.SendMessage("Connect", listString[i]);
						StartWaiting();
						break;
					}
				}
			}
			HideRoomList();
		}
	}
}

// The function in the sense of the call-back function for Camera.main.SendMessage("UpdateRoomList")
// Actually implementing a return-value access
function SetRoomList(list : String[]) {
	listString = list;
}

// Called by Camera.main
function ShowRoomList() {
	if(listState !== "closed") return;
	blackScreen = Instantiate(blackScreenPrefab);
	animation.Play("MoveDown");
	animation.PlayQueued("RollDown", QueueMode.CompleteOthers);
	listState = "opening";
}

// Called by Camera.main
function HideRoomList() {
	if(listState !== "open") return;
	KillRoomListText();
	Destroy(refreshButton);
	animation.Play("RollUp");
	animation.PlayQueued("MoveUp", QueueMode.CompleteOthers);
	listState = "closing";
}

function ConnectionBuilt() {
	if(listState !== "waiting") return;
	hourglass.SetActive(false);
	var showText = Instantiate(listItemPrefab);
	var showContain = "Connection built";
	showText.GetComponent(TextMesh).text = showContain;
	showText.transform.Translate(Vector3.down * 2.5);
	yield WaitForSeconds(1.0);
	Destroy(showText);
	listState = "open";
	HideRoomList();
}

// The calling of this function is controlled by the first "if" block in function Update()
private function ShowRoomListText() {
	Camera.main.SendMessage("UpdateRoomList");
	listItem = new GameObject[listString.Length];
	for(var i=0; i<listString.Length && i<7; ++i) {
		var tmp : GameObject;
		tmp = Instantiate(listItemPrefab);
		tmp.transform.Translate(Vector3.down * i);
		tmp.GetComponent(TextMesh).text = listString[i];
		listItem[i] = tmp;
	}
}

private function KillRoomListText() {
	for(item in listItem) Destroy(item);
}

private function RefreshRoomList() {
	KillRoomListText();
	Camera.main.SendMessage("UpdateRoomList");
	refreshButton.animation.Play();
	listState = "refreshing";
}

private function StartWaiting() {
	KillRoomListText();
	Destroy(refreshButton);
	hourglass = Instantiate(hourglassPrefab);
	listState = "waiting";
}
