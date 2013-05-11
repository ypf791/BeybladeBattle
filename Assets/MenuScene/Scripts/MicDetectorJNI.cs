using UnityEngine;
using System.Collections;

public class MicDetectorJNI : MonoBehaviour {
	private AndroidJavaObject _detector;
	private float volume;

	// Use this for initialization
	void Start() {
		using(var pluginClass = new AndroidJavaClass("com.plugins.MicDetector"))
			_detector = pluginClass.CallStatic<AndroidJavaObject>("getInstance");
		Begin();
	}
	
	// Update is called once per frame
	void Update() {
		volume = _detector.Call<float>("getVolume");
	}
	
	void Pause() {
		_detector.Call("pause");
	}
	
	void Begin() {
		_detector.Call("start");
	}
}
