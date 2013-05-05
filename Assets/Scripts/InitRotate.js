#pragma strict

var initialTorque : int;

function Start () {
	rigidbody.AddRelativeTorque(Vector3.up * initialTorque);
}

function Update () {

}