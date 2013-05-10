#pragma strict

var listItemPrefab : GameObject;
var blackScreenPrefab : GameObject;

private var blackScreen : GameObject;
private var listItem : GameObject[];
private var listString : String[];
private var listState : String;	// closed, closing, open, opening

// Initialization of private booleans and arraies
function Start() {
	listState = "closed";
	listString = [];
	listItem = [];
}

function Update() {
	if(listState=="opening" && !animation.isPlaying) {
		ShowRoomListText();
		listState = "open";
	}
	
	if(listState=="closing" && !animation.isPlaying) {
		listState = "closed";
	}
	
	if(listState=="open" && Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began) {
		var ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
		var hit : RaycastHit;
		if(Physics.Raycast(ray, hit, 1000)) {
			var hitTransform = hit.transform;
			if(hitTransform !== blackScreen.transform) {
				for(var i=0; i<listItem.Length; ++i) {
					if(hitTransform == listItem[i].transform) {
						Camera.main.SendMessage("Connect", listString[i]);
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
	animation.Play("RollUp");
	animation.PlayQueued("MoveUp", QueueMode.CompleteOthers);
	Destroy(blackScreen);
	listState = "closing";
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
		tmp.name = "room" + i;
		listItem[i] = tmp;
	}
}

private function KillRoomListText() {
	for(item in listItem) Destroy(item);
}

private function RefreshRoomList() {
	Camera.main.SendMessage("UpdateRoomList");
	KillRoomListText();
	ShowRoomListText();
}
