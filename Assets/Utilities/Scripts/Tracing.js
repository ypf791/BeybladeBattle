#pragma strict

var lerp : float;
var target : GameObject;

private var _viewpoint : Vector3;

function Start () {
	var tPos = target.transform.position;
	transform.LookAt(tPos);
	_viewpoint = transform.position - tPos;
}

function Update () {
	transform.position = Vector3.Lerp(
		transform.position,
		target.transform.position + _viewpoint,
		lerp * Time.deltaTime
	);
}