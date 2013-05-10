using UnityEngine;
using System.Collections;

public class PseudoJNI : MonoBehaviour {
	public GameObject target;
	
	void Connect(string roomName) {
	}
	
	void UpdateRoomList() {
		// Testing case. Should be replaced with the room list get from Android JNI
		string[] list = new string[]{"room 1", "room 2", "room 3"};
		
		target.SendMessage("SetRoomList", list);
	}
}
