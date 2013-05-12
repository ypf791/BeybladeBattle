#pragma strict

var speedRate : float;
var gyro : Rigidbody;
var countdown : GameObject;
var duration : GameObject;
var energy : GameObject;
var gyroChoice : GameObject[];

private var ax : float;
private var ay : float;
private var az : float;
private var _ax : float;
private var _ay : float;
private var _az : float;
private var timer : float;
private var state : String; // countdown, vibrate, none

private var energyValue : float;
private var energyText : TextMesh;
private var countDownText : TextMesh;
private var durationText : TextMesh;

function Start() {
	timer = 3;
	state = "countdown";
	energyValue = 0;
	
	ax = Input.acceleration.x;
	ay = Input.acceleration.y;
	az = Input.acceleration.z;
	
	energyText = energy.GetComponent(TextMesh);
	durationText = duration.GetComponent(TextMesh);
	countDownText = countdown.GetComponent(TextMesh);
	
	var param = GameObject.FindWithTag("paramBetweenScene");
	if(param.name == "gyro1") {
		gyroChoice[0].SetActive(true);
	}
	else if(param.name == "gyro2") {
		gyroChoice[1].SetActive(true);
	}
}

function Update() {
	if(state == "countdown") {
		timer -= Time.deltaTime;
		countDownText.text = Mathf.CeilToInt(timer).ToString();
		if(timer <= 0) {
			timer = 0;
			duration.SetActive(true);
			Destroy(countdown);
			duration.SetActive(true);
			state = "vibrate";
		}
	}
	else if(state=="vibrate" && timer >= 0) {
		_ax = ax;
		_ay = ay;
		_az = az;
		ax = Input.acceleration.x;
		ay = Input.acceleration.y;
		az = Input.acceleration.z;
		
		var tmp = ((ax-_ax)*(ax-_ax) + (ay-_ay)*(ay-_ay) + (az-_az)*(az-_az)) * speedRate * Time.deltaTime;
		
		gyro.angularVelocity.y += (tmp / 2);
		energyValue += tmp;
		timer += Time.deltaTime;
		
		durationText.text = (Mathf.Ceil(timer * 100) / 100).ToString();
		energyText.text = energyValue.ToString();
		
		if(timer >= 5) {
			ChangeScene(gyro.angularVelocity.y);
			durationText.text = "5.00";
			state = "none";
		}
	}
}

function ChangeScene(speed : float) {
	
}
/*
function OnGUI() {
	GUI.Label(Rect(10, 10, 120, 50), gyro.angularVelocity.y.ToString());
}
//*/
