#pragma strict

var listItemPrefab : GameObject;

private var listItem : GameObject[];
private var isListed : boolean;
private var tmpBool : boolean;

function Start() {
	isListed = false;
	tmpBool = false;
}

function Update() {
	if(tmpBool && !animation.isPlaying) {
		ShowRoomListText();
		isListed = true;
		tmpBool = false;
	}
	
	if(isListed && Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began) {
		var ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
		var hit : RaycastHit;
		if(Physics.Raycast(ray, hit, 1000)) {
			var hitTransform = hit.transform;
			for(var i=0; i<listItem.Length; ++i) {
				if(listItem[i].transform == hitTransform) {
					// Debug.Log(i.ToString());
					HideRoomList();
				}
			}
		}
	}
}

function GetRoomList() {
	var array = ["room 0", "room 1", "room 2"];
	return array;
}

function ShowRoomList() {
	animation.Play("MoveDown");
	animation.PlayQueued("RollDown", QueueMode.CompleteOthers);
	tmpBool = true;
}

function ShowRoomListText() {
	var array = GetRoomList();
	listItem = new GameObject[array.Length];
	for(var i=0; i<array.Length; ++i) {
		var tmp : GameObject;
		tmp = Instantiate(listItemPrefab);
		tmp.transform.Translate(Vector3.down * i);
		tmp.GetComponent(TextMesh).text = array[i];
		tmp.name = "room" + i;
		listItem[i] = tmp;
	}
}

function HideRoomList() {
	for(item in listItem) Destroy(item);
	animation.Play("RollUp");
	animation.PlayQueued("MoveUp", QueueMode.CompleteOthers);
	isListed = false;
}
