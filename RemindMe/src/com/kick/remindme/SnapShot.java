package com.kick.remindme;

import java.io.File;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Locale;
import java.util.TimeZone;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Camera;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.provider.MediaStore;
import android.text.format.DateFormat;
import android.text.format.Time;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.Toast;


@SuppressWarnings("unused")
public class SnapShot extends Activity{
	
	
private static final int CAPTURE_IMAGE_ACTIVITY_REQUEST_CODE = 100;
public static final int MEDIA_TYPE_IMAGE = 1;
private static final String IMAGE_DIRECTORY_NAME = "Hello Camera";
private Uri fileUri; // file url to store image/video
//private File mediaStorageDir;
private ImageView imgPreview;
private Camera mCamera;
//private SurfaceView mPreview;
EditText title;
EditText note;
EditText location;
EditText description;
Button fdate;
Button ftime;
Button tdate;
Button ttime;
String type;
int mYear, mMonth, mDay, mHour;
static int mMinute;
static final int DATE_PICKER_ID = 1111; 
private Handler handler;
DBTools dbTools=new DBTools(this);
String timeStamp;


@Override
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.camera_note);
 
    this.imgPreview = (ImageView)this.findViewById(R.id.imageView);
    title=(EditText) findViewById(R.id.cameranote_title);
	note=(EditText) findViewById(R.id.cameranote_note);
	location=(EditText) findViewById(R.id.cameranote_location);
	description=(EditText) findViewById(R.id.cameranote_description);
	fdate=(Button) findViewById(R.id.crl_fromdate);
	ftime=(Button) findViewById(R.id.crl_fromtime);
	tdate=(Button) findViewById(R.id.crl_todate);
	ttime=(Button) findViewById(R.id.crl_totime);
	type="2";
	handler=new Handler();
	
	//Get Current Date and Time 
	
	Time today = new Time(Time.getCurrentTimezone());
	today.setToNow();
	
	
	//Set Current DAte and Time
	
	fdate.setText(today.monthDay + " \\ " + today.month + " \\ " + today.year);   
	
	ftime.setText(today.format("%k:%M:%S"));
	
	tdate.setText(today.monthDay + " \\ " + today.month + " \\ " + today.year);   
	
	ttime.setText(today.format("%k:%M:%S"));	
    
    // create Intent to take a picture and return control to the calling application
	
    Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

    fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE); // create a file to save the image
 
   
   
   intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri); // set the image file name

    // start the image capture Intent
    startActivityForResult(intent, CAPTURE_IMAGE_ACTIVITY_REQUEST_CODE);
    
    if (!isDeviceSupportCamera()) {
    	handler.post(new Runnable() {
		    public void run() {
		        Toast toast = Toast.makeText(getApplicationContext(), "You Device doesn't Support Camera", Toast.LENGTH_LONG);
		        toast.show();
		    }
		 });
        // will close the app if the device does't have camera
        finish();
    }
    
}


public void newcameraNote(View view){
	
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
	queryValuesMap.put("fileuri",fileUri.toString());
	
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


public void callMainActivity(View view){
	Intent theIntent=new Intent(getApplication(),MainActivity.class);
	startActivity(theIntent);	
}


/**
 * Here we store the file url as it will be null after returning from camera
 * app
 */
@Override
protected void onSaveInstanceState(Bundle outState) {
    super.onSaveInstanceState(outState);

    // save file url in bundle as it will be null on scren orientation
    // changes
    outState.putParcelable("file_uri", fileUri);
}

@Override
protected void onRestoreInstanceState(Bundle savedInstanceState) {
    super.onRestoreInstanceState(savedInstanceState);

    // get the file url
    fileUri = savedInstanceState.getParcelable("file_uri");
}




@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
	
	//timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss",
	  //         Locale.getDefault()).format(new Date(1));
	
    if (requestCode == CAPTURE_IMAGE_ACTIVITY_REQUEST_CODE) {
    	
        if (resultCode == RESULT_OK) {
            // Image captured and saved to fileUri specified in the Intent
        	handler.post(new Runnable() {
			    public void run() {
			        Toast toast = Toast.makeText(getApplicationContext(), "Image Captured", Toast.LENGTH_LONG);
			        toast.show();
			    }
			 });


        	 try {
        	        // hide video preview
        	        imgPreview.setVisibility(View.VISIBLE);

        	        // bimatp factory
        	          	           
        	       BitmapFactory.Options options = new BitmapFactory.Options();

        	        // downsizing image as it throws OutOfMemory Exception for larger
        	        // images
        	        options.inSampleSize = 8;

        	        final Bitmap bitmap = BitmapFactory.decodeFile(fileUri.getPath(),
        	                options);
        	        Bitmap.createBitmap(bitmap);
        	        imgPreview.setImageBitmap(bitmap);
        	        
        	    } catch (NullPointerException e) {
        	        e.printStackTrace();
        	    }

        	
        	
        } else if (resultCode == RESULT_CANCELED) {
            // User cancelled the image capture
        	handler.post(new Runnable() {
			    public void run() {
			        Toast toast = Toast.makeText(getApplicationContext(), "Image Capture Cancelled", Toast.LENGTH_LONG);
			        toast.show();
			    }
			 });
        	
        	
        	Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

            fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE); // create a file to save the image
            
            intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri); // set the image file name

        	startActivityForResult(intent, CAPTURE_IMAGE_ACTIVITY_REQUEST_CODE);
        	
        } else {
            // Image capture failed, advise user
        	handler.post(new Runnable() {
			    public void run() {
			        Toast toast = Toast.makeText(getApplicationContext(), "Sorry Failed To Capture Image", Toast.LENGTH_LONG);
			        toast.show();
			    }
			 });
        }
    }
}

//check camera availability
private boolean isDeviceSupportCamera() {
    if (getApplicationContext().getPackageManager().hasSystemFeature(
            PackageManager.FEATURE_CAMERA)) {
        // this device has a camera
        return true;
    } else {
        // no camera on this device
        return false;
    }
}






public Uri getOutputMediaFileUri(int type) {
    return Uri.fromFile(getOutputMediaFile(type));
}

/**
 * returning image / video
 */
@SuppressLint("SimpleDateFormat")
private static File getOutputMediaFile(int type) {

    // External sdcard location
   File mediaStorageDir = new File(
            Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES),
          IMAGE_DIRECTORY_NAME);

    // Create the storage directory if it does not exist
    if (!mediaStorageDir.exists()) {
    	
    	mediaStorageDir.mkdirs();
    	
        if (!mediaStorageDir.mkdirs()) {
            Log.d(IMAGE_DIRECTORY_NAME, "Oops! Failed create "
                    + IMAGE_DIRECTORY_NAME + " directory");
            return null;
        }
    }

    // Create a media file name   
   // Time today = new Time(Time.getCurrentTimezone());
	//today.setToNow();
    
   // Calendar c = Calendar.getInstance();
    //System.out.println("Current time => " + c.getTime());

   // SimpleDateFormat timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss");
   // String formattedDate = timeStamp.format(c.getTime());
    SimpleDateFormat time = new SimpleDateFormat("yyyyMMdd_HHmmss");
    String timeStamp = time.format(Calendar.getInstance().getTime());
    
    
	
	//Calendar cal = new GregorianCalendar();
   // SimpleDateFormat timeStamp = new SimpleDateFormat("yyyy/MMM/dd hh:mm:ss z");
   // timeStamp.setCalendar(cal);
   // cal.setTime(today);
   // timeStamp.format(date);
	
    
	//String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss",
		//Locale.getDefault()).format(new Date(today));
    File mediaFile;
    if (type == MEDIA_TYPE_IMAGE) {
        mediaFile = new File(mediaStorageDir.getPath() + File.separator
                + "IMG_" + timeStamp + ".jpg");
    }else {
        return null;
    }

    return mediaFile;
}

public void fdatePicker(View view){
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
                   fdate.setText(dayOfMonth + "\\"
                           + (monthOfYear + 1) + "\\" + year);

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
}