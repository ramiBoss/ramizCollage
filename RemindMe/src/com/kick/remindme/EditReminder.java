package com.kick.remindme;

import java.util.HashMap;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.text.format.Time;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

@SuppressWarnings("unused")
public class EditReminder extends Activity{
	
	
	EditText title;
	EditText note;
	EditText location;
	EditText description;
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
		setContentView(R.layout.edit_reminder);
		
		handler = new Handler();
		title=(EditText) findViewById(R.id.l_title);
		note=(EditText) findViewById(R.id.l_note);
		location=(EditText) findViewById(R.id.l_location);
		description=(EditText) findViewById(R.id.l_description);
		fdate=(Button) findViewById(R.id.rlfromdate);
		ftime=(Button) findViewById(R.id.rlfromtime);
		tdate=(Button) findViewById(R.id.rltodate);
		ttime=(Button) findViewById(R.id.rltotime);
		
		Intent theIntent=getIntent();
		
		String remindId=theIntent.getStringExtra("remindId");
		
		HashMap<String,String> reminderList=dbTools.getReminderInfo(remindId);
		
		if(reminderList.size() != 0){
			title.setText(reminderList.get("title"));
			note.setText(reminderList.get("note"));
			fdate.setText(reminderList.get("fdate"));
			ftime.setText(reminderList.get("ftime"));
			tdate.setText(reminderList.get("tdate"));
			ttime.setText(reminderList.get("ttime"));
			location.setText(reminderList.get("location"));
			description.setText(reminderList.get("description"));
		}
	}	
		
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		///getMenuInflater().inflate(R.menu.add_new, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings) {
			return true;
		}
		return super.onOptionsItemSelected(item);
	}
	
	public void editReminder(View view){
		HashMap<String,String> queryValuesMap = new HashMap<String,String>();
		title=(EditText) findViewById(R.id.l_title);
		note=(EditText) findViewById(R.id.l_note);
		fdate=(Button) findViewById(R.id.rlfromdate);
		ftime=(Button) findViewById(R.id.rlfromtime);
		tdate=(Button) findViewById(R.id.rltodate);
		ttime=(Button) findViewById(R.id.rltotime);
		location=(EditText) findViewById(R.id.l_location);
		description=(EditText) findViewById(R.id.l_description);
		//type="1";
		Intent theIntent=getIntent();
		
		String remindId=theIntent.getStringExtra("remindId");
		
		queryValuesMap.put("remindId",remindId);
		//queryValuesMap.put("notetype",type);
		queryValuesMap.put("title",title.getText().toString());
		queryValuesMap.put("note",note.getText().toString());
		queryValuesMap.put("fdate",fdate.getText().toString());
		queryValuesMap.put("ftime",ftime.getText().toString());
		queryValuesMap.put("tdate",tdate.getText().toString());
		queryValuesMap.put("ttime",ttime.getText().toString());
		queryValuesMap.put("location",location.getText().toString());
		queryValuesMap.put("description",description.getText().toString());
		
	
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