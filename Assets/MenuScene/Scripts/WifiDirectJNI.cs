using UnityEngine;
using System.Collections; 
using System;

public class WifiDirectJNI : MonoBehaviour  
{ 
	public GameObject roomListTarget;
	public GameObject waitBoardTarget;
	
	private bool isWaiting;
	
 	AndroidJavaClass cls_UnityPlayer;
	AndroidJavaObject obj;
	AndroidJavaClass cls_CompassActivity;
	
	// Use this for initialization 
	void Start(){ 
		isWaiting = false;
		
		AndroidJNI.AttachCurrentThread();
		cls_UnityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
		obj = cls_UnityPlayer.GetStatic<AndroidJavaObject>("currentActivity");
		cls_CompassActivity = new AndroidJavaClass("com.plugins.MainActivity");
		cls_CompassActivity.CallStatic("Init", obj);
		obj.Call("setClearFirst");
		obj.Call("startWifiDirect");
	} 
/*
	void Update(){ 
		if(Input.GetKey(KeyCode.Escape)){ 
			Application.Quit();
		}
	}
//*/
/*
	void OnGUI(){ 
		//if(GUI.Button(new Rect(Screen.width-120,Screen.height-40,120,30), "Click")){} 
	} 
//*/
	void Connect(string n){
		obj.Call("connect", n);
	}
	
	void CheckConnected() {
		if(obj.Get<bool>("isConnect")) SendMessage("SwitchScene");
	}
	
    void UpdateRoomList(){
		string[] list = obj.Call<string[]>("getPeerNameArray");
		roomListTarget.SendMessage("SetRoomList", list);
    }
	
	void ConnectSuccess(){
		if(isWaiting) waitBoardTarget.SendMessage("ConnectionBuilt");
		roomListTarget.SendMessage("ConnectionBuilt");
	}
	
	void BeginWaiting() {
		isWaiting = true;
	}
	
	void StopWaiting() {
		isWaiting = false;
	}
    
	//To get peer list :
	//		list = obj_Activity.Call<String[]>("getPeerNameArray");
	//		gb.SendMessage("SetRoomList", list);
	
	//To connected :
	//		obj_Activity.Call("connect", num);
	
	//To send data :
	//		obj_Activity.Call("send", str);
	
}