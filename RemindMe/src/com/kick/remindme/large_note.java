package com.kick.remindme;

import java.util.Calendar;
import java.util.HashMap;
import android.app.Activity;
import android.app.AlarmManager;
import android.app.DatePickerDialog;
import android.app.PendingIntent;
import android.app.TimePickerDialog;
import android.content.Context;
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
import com.kick.remindme.R;

@SuppressWarnings("unused")
public class large_note extends Activity {

	
	EditText title;
	EditText note;
	EditText location;
	EditText description;
	Button fdate;
	Button ftime;
	Button tdate;
	Button ttime;
	String type;
	int mYear, mMonth, mDay, mHour, mMinute;
	static final int DATE_PICKER_ID = 1111; 
	private Handler handler;
	//private ScheduleClient scheduleClient;
	//@SuppressWarnings("unused")
	//private AlarmManager alarmMgr;
	//@SuppressWarnings("unused")
	//private PendingIntent alarmIntent;
	DBTools dbTools=new DBTools(this);
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.large_note);
		
		handler = new Handler();
		title=(EditText) findViewById(R.id.longtitle);
		note=(EditText) findViewById(R.id.longnote);
		location=(EditText) findViewById(R.id.llocation);
		description=(EditText) findViewById(R.id.ldescription);
		fdate=(Button) findViewById(R.id.rl_fromdate);
		ftime=(Button) findViewById(R.id.rl_fromtime);
		tdate=(Button) findViewById(R.id.rl_todate);
		ttime=(Button) findViewById(R.id.rl_totime);
		type="1";		
		
		//Get Current Date and Time 
		
				Time today = new Time(Time.getCurrentTimezone());
				today.setToNow();
				
				
				//Set Current DAte and Time
				
				fdate.setText(today.monthDay + " \\ " + today.month + " \\ " + today.year);   
				
				ftime.setText(today.format("%k:%M:%S"));
				
				tdate.setText(today.monthDay + " \\ " + today.month + " \\ " + today.year);   
				
				ttime.setText(today.format("%k:%M:%S"));	
								
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
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
	
	public void newLargeNote(View view){
		HashMap<String,String> queryValuesMap = new HashMap<String,String>();
		queryValuesMap.put("notetype",type);
		queryValuesMap.put("title",title.getText().toString());
		queryValuesMap.put("note",note.getText().toString());
		queryValuesMap.put("fdate",fdate.getText().toString());
		queryValuesMap.put("ftime",ftime.getText().toString());
		queryValuesMap.put("tdate",tdate.getText().toString());
		queryValuesMap.put("ttime",ttime.getText().toString());
		queryValuesMap.put("location",location.getText().toString());
		queryValuesMap.put("description",description.getText().toString());
		
	    dbTools.insertReminder(queryValuesMap);
		
	    handler.post(new Runnable() {
		    public void run() {
		        Toast toast = Toast.makeText(getApplicationContext(), "Reminder Added", Toast.LENGTH_LONG);
		        toast.show();
		    }
		 });
	    
	    /*int year,month,day;
	    
	    Time today = new Time(Time.getCurrentTimezone());
		today.setToNow();
	    year=today.year;
	    month=today.month;
	    day=today.monthDay;
	   Calendar c = Calendar.getInstance();
       c.set(year, month, day);
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
       c.set(Calendar.SECOND, 0);
	   // String c = "Check the Notification";
        // Ask our service to set an alarm for that date, this activity talks to the client that talks to the service
        scheduleClient.setAlarmForNotification(c);*/
       
		this.callMainActivity(view);
	}
	
	public void cancel(View v){
		this.callMainActivity(v);
	}
	
	public void fdatePicker(View view){
		
		final Calendar c = Calendar.getInstance();
        mYear = c.get(Calendar.YEAR);
        mMonth = c.get(Calendar.MONTH);
        mDay = c.get(Calendar.DAY_OF_MONTH);
		 // Launch Date Picker Dialog
	    DatePickerDialog dpd = new DatePickerDialog(this,
	            new DatePickerDialog.OnDateSetListener() {

	                @Override
	                public void onDateSet(DatePicker view, int year,
	                        int monthOfYear, int dayOfMonth) {
	                    // Display Selected date in textbox
	                    fdate.setText(dayOfMonth + "\\"
	                            + (monthOfYear + 1) + "\\" + year);

	                }
	            }, mYear, mMonth, mDay);
	    dpd.show();
	}

	public void ftimePicker(View view){
		final Calendar c = Calendar.getInstance();
        mHour = c.get(Calendar.HOUR_OF_DAY);
        mMinute = c.get(Calendar.MINUTE);
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
		final Calendar c = Calendar.getInstance();
        mYear = c.get(Calendar.YEAR);
        mMonth = c.get(Calendar.MONTH);
        mDay = c.get(Calendar.DAY_OF_MONTH);
		 // Launch Date Picker Dialog
	    DatePickerDialog dpd = new DatePickerDialog(this,
	            new DatePickerDialog.OnDateSetListener() {

	                @Override
	                public void onDateSet(DatePicker view, int year,
	                        int monthOfYear, int dayOfMonth) {
	                    // Display Selected date in textbox
	                    fdate.setText(dayOfMonth + "\\"
	                            + (monthOfYear + 1) + "\\" + year);

	                }
	            }, mYear, mMonth, mDay);
	    dpd.show();
	}



	public void ttimePicker(View view){
		final Calendar c = Calendar.getInstance();
        mHour = c.get(Calendar.HOUR_OF_DAY);
        mMinute = c.get(Calendar.MINUTE);
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
	
/*	@Override
    protected void onStop() {
        // When our activity is stopped ensure we also stop the connection to the service
        // this stops us leaking our activity into the system *bad*
        if(scheduleClient != null)
            scheduleClient.doUnbindService();
        super.onStop();
    }*/
}
