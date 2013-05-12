using UnityEngine;
using System.Collections;

public class PseudoJNI : MonoBehaviour {
	public GameObject roomListTarget;
	public GameObject waitBoardTarget;
	
	private bool isConnected;
	private bool isWaiting;
	
	void Start() {
		isWaiting = false;
		isConnected = false;
	}
	
	IEnumerator Connect(string roomName) {
		yield return new WaitForSeconds(2.0F);
		isConnected = true;
		roomListTarget.SendMessage ("ConnectionBuilt");
	}
	
	void UpdateRoomList() {
		// Testing case. Should be replaced with the room list get from Android JNI
		string[] list = new string[]{"Alice", "Bob", "Oscar"};
		
		roomListTarget.SendMessage("SetRoomList", list);
	}
	
	void CheckConnected() {
		if(isConnected) SendMessage("SwitchScene");
	}
	
	IEnumerator BeginWaiting() {
		isWaiting = true;
		yield return new WaitForSeconds(2.0F);
		if(isWaiting) isConnected = true;
		waitBoardTarget.SendMessage("ConnectionBuilt");
	}
	
	void StopWaiting() {
		isWaiting = false;
	}
}
