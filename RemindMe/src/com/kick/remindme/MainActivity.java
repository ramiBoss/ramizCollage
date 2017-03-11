package com.kick.remindme;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;

import android.annotation.SuppressLint;
import android.app.AliasActivity;
import android.app.ListActivity;
import android.content.Context;
import android.content.DialogInterface.OnClickListener;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.provider.MediaStore;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.TextView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.Toast;

@SuppressWarnings("unused")
public class MainActivity extends ListActivity {

	Intent intent;
	DBTools dbTools=new DBTools(this);
	TextView reminderId;
	TextView type;
	private Handler handler;
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
	    ArrayList<HashMap<String,String>> remindList=dbTools.getAllreminders();
		dbTools.getAllreminders();
		handler = new Handler();
	    if(remindList.size() != 0){
		
			    ListView listView=getListView();//(ListView)findViewById(android.R.id.list);
				listView.setOnItemClickListener(new OnItemClickListener(){
					
					public void onItemClick(AdapterView<?> arg0,View view,
							int position,long id){
						reminderId=(TextView) view.findViewById(R.id.reminderId);
						type=(TextView) view.findViewById(R.id.notetype);
						String remindIdValue=reminderId.getText().toString();
						String ntype=type.getText().toString();
						switch(ntype)
						{
						case "1":
						Intent theIntent1=new Intent( getApplication(),com.kick.remindme.EditReminder.class);
						theIntent1.putExtra("remindId", remindIdValue);
						startActivity(theIntent1);
						break;
						case "2":
							Intent theIntent2=new Intent( getApplication(),com.kick.remindme.EditCameraReminder.class);
							theIntent2.putExtra("remindId", remindIdValue);
							startActivity(theIntent2);
							break;
						case "3":
							Intent theIntent3=new Intent( getApplication(),com.kick.remindme.EditShortReminder.class);
							theIntent3.putExtra("remindId", remindIdValue);
							startActivity(theIntent3);
							break;
							default:
								handler.post(new Runnable() {
								    public void run() {
								        Toast toast = Toast.makeText(getApplicationContext(), "Error Occurred", Toast.LENGTH_LONG);
								        toast.show();
								    }
								 });
						}
					}
				});
				
				ListAdapter adapter=new SimpleAdapter(
						MainActivity.this,remindList,R.layout.showlist,
						new String[]{"remindId","title","notetype"},
						new int[]{R.id.reminderId , R.id.remindtitle,R.id.notetype});
				
						setListAdapter(adapter);	
			}
			    
		}	
			

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
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
	
	
	
	//Call camera_note Activity
	public void cameranote(View view){
		Intent theIntent =new Intent(getApplication(),com.kick.remindme.SnapShot.class);
		startActivity(theIntent);
	}
	
	//Call large_note Activity
	public void longNote(View view){
		Intent theIntent =new Intent(getApplication(),com.kick.remindme.large_note.class);
		startActivity(theIntent);
	}
	
	
	
	//Call short_note Activity
	public void shortNote(View view){
		Intent theIntent =new Intent(getApplication(),com.kick.remindme.short_note.class);
		startActivity(theIntent);
	}
	
	
	/*public void table(View view){
		 Intent dbmanager = new Intent(getApplication(),com.kick.remindme.AndroidDatabaseManager.class);
         startActivity(dbmanager);
	}
	*/
	
	
	
	  
}
