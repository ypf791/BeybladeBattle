#pragma strict

function Start () {

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
					break;
				case "quit":
					Application.Quit();
				default:
					break;
			}
		}
	}
}