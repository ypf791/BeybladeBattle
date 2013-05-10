using UnityEngine;
using System.Collections; 
using System; 
public class CompassJNI : MonoBehaviour  
{ 
	public GameObject gb;
	String myInfo;
	String othersInfo;
 	AndroidJavaClass cls_UnityPlayer;
	AndroidJavaObject obj_Activity;
	AndroidJavaClass cls_CompassActivity;
	String[] list;
	// Use this for initialization 
	void Start ()  
	{ 
		AndroidJNI.AttachCurrentThread();
		cls_UnityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
		obj_Activity = cls_UnityPlayer.GetStatic<AndroidJavaObject>("currentActivity");
		cls_CompassActivity = new AndroidJavaClass("com.example.test00.MainActivity");
		cls_CompassActivity.CallStatic("Init", obj_Activity);
		obj_Activity.Call("startWifiDirect");
	} 
 
	void Update() { 
		if(Input.GetKey(KeyCode.Escape))
		{ 
			Application.Quit();
		}
	} 
	
	void UpdateRoomList() {
		list = obj_Activity.Call<String[]>("getPeerNameArray");
		gb.SendMessage ("SetRoomList", list);
	}
	
	void connect(int i) {
		obj_Activity.Call("connect", i);
	}
	
	//To get peer list :
	//		list = obj_Activity.Call<String[]>("getPeerNameArray");
	//		gb.SendMessage("SetRoomList", list);
	
	//To connected :
	//		obj_Activity.Call("connect", num);
	
	//To send data :
	//		obj_Activity.Call("send", str);
	
}