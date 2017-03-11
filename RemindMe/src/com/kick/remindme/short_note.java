package com.kick.remindme;

import java.util.Calendar;
import java.util.HashMap;

import android.app.Activity;
import android.app.AliasActivity;
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.app.TimePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.text.format.Time;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TimePicker;
import android.widget.Toast;

@SuppressWarnings("unused")
public class short_note extends Activity {

	
	EditText location;
	EditText note;
	Button fdate;
	Button ftime;
	Button tdate;
	Button ttime;
	String type;
	int mYear, mMonth, mDay, mHour, mMinute;
	static final int DATE_PICKER_ID = 1111; 
	DBTools dbTools=new DBTools(this);
	private Handler handler;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.short_note);
		handler = new Handler();
		note=(EditText) findViewById(R.id.s_note);
		location=(EditText) findViewById(R.id.e_location);
		fdate=(Button) findViewById(R.id.fromdate);
		ftime=(Button) findViewById(R.id.fromtime);
		tdate=(Button) findViewById(R.id.todate);
		ttime=(Button) findViewById(R.id.totime);
		type="3";
		//Get Current Date and Time 
		
		Time today = new Time(Time.getCurrentTimezone());
		today.setToNow();
		
		
		//Set Current Date and Time
		
		fdate.setText(today.monthDay + " \\ " + today.month + " \\ " + today.year);   
		
		ftime.setText(today.format("%k:%M:%S"));
		
		tdate.setText(today.monthDay + " \\ " + today.month + " \\ " + today.year);   
		
		ttime.setText(today.format("%k:%M:%S"));
		
		/*location=(EditText) findViewById(R.id.e_location);
		note=(EditText) findViewById(R.id.s_note);*/
		
}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		 //Inflate the menu; this adds items to the action bar if it is present.
		//getMenuInflater().inflate(R.menu.add_new, menu);
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
	
	
	
	public void newShortNote(View view){
		HashMap<String,String> queryValuesMap = new HashMap<String,String>();
		
		queryValuesMap.put("notetype",type);
		queryValuesMap.put("note",note.getText().toString());
		queryValuesMap.put("fdate",fdate.getText().toString());
		queryValuesMap.put("ftime",ftime.getText().toString());
		queryValuesMap.put("tdate",tdate.getText().toString());
		queryValuesMap.put("ttime",ttime.getText().toString());
		queryValuesMap.put("location",location.getText().toString());	
		dbTools.insertReminder(queryValuesMap);
		
		 handler.post(new Runnable() {
			    public void run() {
			        Toast toast = Toast.makeText(getApplicationContext(), "Reminder Added", Toast.LENGTH_LONG);
			        toast.show();
			    }
			 });
		
		this.callMainActivity(view);
	}
	
	
		public void cancel(View v){
		this.callMainActivity(v);
	}
	
public void fdatePicker(View view){
	 // Launch Date Picker Dialog
    DatePickerDialog dpd = new DatePickerDialog(this,
            new DatePickerDialog.OnDateSetListener() {

                @Override
                public void onDateSet(DatePicker view, int year,
                        int monthOfYear, int dayOfMonth) {
                    // Display Selected date in textbox
                    fdate.setText(dayOfMonth + "-"
                            + (monthOfYear + 1) + "-" + year);

                }
            }, mYear, mMonth, mDay);
    dpd.show();
}

public void ftimePicker(View view){
	 // Launch Time Picker Dialog
    TimePickerDialog tpd = new TimePickerDialog(this,
            new TimePickerDialog.OnTimeSetListener() {

                @Override
                public void onTimeSet(TimePicker view, int hourOfDay,
                        int minute) {
                    // Display Selected time in textbox
                    ftime.setText(hourOfDay + ":" + minute);
                }
            }, mHour, mMinute, false);
    tpd.show();
}

public void tdatePicker(View view){
	 // Launch Date Picker Dialog
    DatePickerDialog dpd = new DatePickerDialog(this,
            new DatePickerDialog.OnDateSetListener() {

                @Override
                public void onDateSet(DatePicker view, int year,
                        int monthOfYear, int dayOfMonth) {
                    // Display Selected date in textbox
                    fdate.setText(dayOfMonth + "-"
                            + (monthOfYear + 1) + "-" + year);

                }
            }, mYear, mMonth, mDay);
    dpd.show();
}



public void ttimePicker(View view){
	 // Launch Time Picker Dialog
    TimePickerDialog tpd = new TimePickerDialog(this,
            new TimePickerDialog.OnTimeSetListener() {

                @Override
                public void onTimeSet(TimePicker view, int hourOfDay,
                        int minute) {
                    // Display Selected time in textbox
                    ttime.setText(hourOfDay + ":" + minute);
                }
            }, mHour, mMinute, false);
    tpd.show();
}



	
public void callMainActivity(View view){
		Intent theIntent=new Intent(getApplication(),MainActivity.class);
startActivity(theIntent);	
	}
}
