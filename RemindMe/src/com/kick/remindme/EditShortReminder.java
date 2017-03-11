package com.kick.remindme;

import java.util.HashMap;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.text.format.Time;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

@SuppressWarnings("unused")
public class EditShortReminder extends Activity{
	
	EditText note;
	EditText location;
	Button fdate;
	Button ftime;
	Button tdate;
	Button ttime;
	String type;
DBTools dbTools=new DBTools(this);
private Handler handler;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.editshortnote);
		
		handler = new Handler();
		note=(EditText) findViewById(R.id.snote);
		location=(EditText) findViewById(R.id.elocation);	
		fdate=(Button) findViewById(R.id.f_date);
		ftime=(Button) findViewById(R.id.f_time);
		tdate=(Button) findViewById(R.id.to_date);
		ttime=(Button) findViewById(R.id.to_time);
		
		Intent theIntent=getIntent();
		
		String remindId=theIntent.getStringExtra("remindId");
		
		HashMap<String,String> reminderList=dbTools.getReminderInfo(remindId);
		if(reminderList.size() != 0){
			
			note.setText(reminderList.get("note"));
			fdate.setText(reminderList.get("fdate"));
			ftime.setText(reminderList.get("ftime"));
			tdate.setText(reminderList.get("tdate"));
			ttime.setText(reminderList.get("ttime"));
			location.setText(reminderList.get("location"));
			
		}
	}

	
	public void editReminder(View view){
		HashMap<String,String> queryValuesMap = new HashMap<String,String>();
		
		note=(EditText) findViewById(R.id.snote);
		fdate=(Button) findViewById(R.id.f_date);
		ftime=(Button) findViewById(R.id.f_time);
		tdate=(Button) findViewById(R.id.to_date);
		ttime=(Button) findViewById(R.id.to_time);
		location=(EditText) findViewById(R.id.elocation);
		type="3";
		
		Intent theIntent=getIntent();
		
		String remindId=theIntent.getStringExtra("remindId");
		
		//queryValuesMap.put("remindId",remindId);
		//queryValuesMap.put("notetype",type);
		queryValuesMap.put("note",note.getText().toString());
		queryValuesMap.put("fdate",fdate.getText().toString());
		queryValuesMap.put("ftime",ftime.getText().toString());
		queryValuesMap.put("tdate",tdate.getText().toString());
		queryValuesMap.put("ttime",ttime.getText().toString());
		queryValuesMap.put("location",location.getText().toString());
		
		
	
		dbTools.updateReminder(queryValuesMap);
		handler.post(new Runnable() {
		    public void run() {
		        Toast toast = Toast.makeText(getApplicationContext(), "Reminder Updated", Toast.LENGTH_LONG);
		        toast.show();
		    }
		 });
		
		this.callMainActivity(view);
	}
	
	
public void removeReminder(View view){
		
		Intent theIntent=getIntent();
		
		String remindId=theIntent.getStringExtra("remindId");
		dbTools.deleteReminder(remindId);
		this.callMainActivity(view);
}
	
	public void callMainActivity(View view){
		Intent theIntent=new Intent(getApplication(),MainActivity.class);
		startActivity(theIntent);	
	}

	
	
	
}	

