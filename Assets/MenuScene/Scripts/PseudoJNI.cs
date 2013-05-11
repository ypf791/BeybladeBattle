using UnityEngine;
using System.Collections;

public class PseudoJNI : MonoBehaviour {
	public GameObject roomListTarget;
	public GameObject waitBoardTarget;
	
	private bool isWaiting;
	
	void Start() {
			isWaiting = false;
	}
	
	IEnumerator Connect(string roomName) {
		yield return new WaitForSeconds(2.0F);
		roomListTarget.SendMessage ("ConnectionBuilt", roomName);
	}
	
	void UpdateRoomList() {
		// Testing case. Should be replaced with the room list get from Android JNI
		string[] list = new string[]{"Alice", "Bob", "Oscar"};
		
		roomListTarget.SendMessage("SetRoomList", list);
	}
	
	IEnumerator BeginWaiting() {
		isWaiting = true;
		yield return new WaitForSeconds(2.0F);
		if(isWaiting) waitBoardTarget.SendMessage("ConnectionBuilt", "Oscar");
	}
	
	void StopWaiting() {
		isWaiting = false;
	}
}
