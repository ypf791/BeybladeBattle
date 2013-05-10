#pragma strict

var speed : float;

private var _pos : Vector3;

function Start () {
	_pos = rigidbody.position;
}

function Update () {
	var movSpeed = speed;
	
	// transform.Translate(Vector3.right * Input.GetAxis("Horizontal") * movSpeed, Space.World);
	// transform.Translate(Vector3.forward * Input.GetAxis("Vertical") * movSpeed, Space.World);
	rigidbody.velocity.x += movSpeed * Input.GetAxis("Horizontal");
	rigidbody.velocity.z += movSpeed * Input.GetAxis("Vertical");
	
}