package com.kick.remindme;

import java.util.ArrayList;
import java.util.HashMap;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.MatrixCursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

public class DBTools extends SQLiteOpenHelper{
	
	public static final int DATABASE_VERSION = 1;

	public DBTools(Context applicationContext){
		
		super(applicationContext, "remindme.db",null,DATABASE_VERSION);
	}

	@Override
	public void onCreate(SQLiteDatabase database) {
		
		String query="CREATE TABLE reminders( remindId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , notetype INTEGER , title VARCHAR(25) , note VARCHAR(255) , fdate BLOB , ftime BLOB , tdate BLOB , ttime TEXT , location BLOB , description VARCHAR(255) , fileuri BLOB)";
		
		database.execSQL(query);
		
	}

	@Override
	public void onUpgrade(SQLiteDatabase database, int oldVersion, int newVersion) {
        String query="DROP TABLE IF EXISTS reminders";
		database.execSQL(query);
		onCreate(database);
	}
	
	public void insertReminder(HashMap<String,String> queryValues){
		SQLiteDatabase database=this.getWritableDatabase();
		
		ContentValues values=new ContentValues();		
		values.put("notetype", queryValues.get("notetype"));
		values.put("title", queryValues.get("title"));
		values.put("note", queryValues.get("note"));
		values.put("fdate", queryValues.get("fdate"));
		values.put("ftime", queryValues.get("ftime"));
		values.put("tdate", queryValues.get("tdate"));
		values.put("ttime", queryValues.get("ttime"));
		values.put("location", queryValues.get("location"));
		values.put("description", queryValues.get("description"));
		values.put("fileuri", queryValues.get("fileuri"));
				
		database.insert("reminders", null, values);
		
		database.close();
	}
	
	public int updateReminder(HashMap<String,String> queryValues){
		
	SQLiteDatabase database=this.getWritableDatabase();
		
		ContentValues values=new ContentValues();
		values.put("title", queryValues.get("title"));
		values.put("note", queryValues.get("note"));
		values.put("fdate", queryValues.get("fdate"));
		values.put("ftime", queryValues.get("ftime"));
		values.put("tdate", queryValues.get("tdate"));
		values.put("ttime", queryValues.get("ttime"));
		values.put("location", queryValues.get("location"));
		values.put("description", queryValues.get("description"));
		values.put("fileuri", queryValues.get("fileuri"));
				
		return database.update("reminders", values, 
				"remindId" +" = ?",new String[] {queryValues.get("remindId")});
	}
	
	public void deleteReminder(String id){
		SQLiteDatabase database=this.getWritableDatabase();
		
		String deletequery="DELETE FROM reminders WHERE remindId='" + id +"'";
	
		database.execSQL(deletequery);
		//database.close();
	}
	
	
	public ArrayList<HashMap<String,String>> getAllreminders(){ 
		ArrayList<HashMap<String,String>> reminderArrayList=new ArrayList<HashMap<String,String>>();
		String selectQuery="SELECT * FROM reminders ORDER BY remindId";
		
		SQLiteDatabase database=this.getWritableDatabase();
		
		Cursor cursor=database.rawQuery(selectQuery,null);
		if(cursor.moveToFirst()){
			do{
				HashMap<String,String> reminderMap=new HashMap<String,String>();
				reminderMap.put("remindId", cursor.getString(0));
				reminderMap.put("notetype", cursor.getString(1));
				reminderMap.put("title", cursor.getString(2));
		     	reminderArrayList.add(reminderMap);
			}while(cursor.moveToNext());
			
		}
		
		return reminderArrayList;
	}
	
   public HashMap<String,String> getReminderInfo(String id){
		 HashMap<String,String> reminderMap=new  HashMap<String,String>();
		 
		 SQLiteDatabase database=this.getReadableDatabase();		 
		 String selectQuery="SELECT * FROM reminders WHERE remindId='" + id +"'";
		 
	     Cursor cursor=database.rawQuery(selectQuery,null);
	     
			if(cursor.moveToFirst()){
				do{
					reminderMap.put("remindId", cursor.getString(0));
					reminderMap.put("notetype", cursor.getString(1));
					reminderMap.put("title", cursor.getString(2));
					reminderMap.put("note", cursor.getString(3));
					reminderMap.put("fdate", cursor.getString(4));
					reminderMap.put("ftime", cursor.getString(5));
					reminderMap.put("tdate", cursor.getString(6));
					reminderMap.put("ttime", cursor.getString(7));
					reminderMap.put("location", cursor.getString(8));
					reminderMap.put("description", cursor.getString(9));
					reminderMap.put("fileuri", cursor.getString(10));						
					}while(cursor.moveToNext());
				}
		
			return reminderMap;
	}
	
	
	/*public ArrayList<HashMap<String,String>> getReminderInfo(String id){
		ArrayList<HashMap<String,String>> reminderArrayList=new ArrayList<HashMap<String,String>>();
		 SQLiteDatabase database=this.getReadableDatabase();		 
		 String selectQuery="SELECT * FROM reminders WHERE remindId='" + id +"'";
	     Cursor cursor=database.rawQuery(selectQuery,null);
			if(cursor.moveToFirst()){
				HashMap<String,String> reminderMap=new  HashMap<String,String>();
				do{
					reminderMap.put("remindId", cursor.getString(0));
					reminderMap.put("notetype", cursor.getString(1));
					reminderMap.put("title", cursor.getString(2));
					reminderMap.put("note", cursor.getString(3));
					reminderMap.put("fdate", cursor.getString(4));
					reminderMap.put("ftime", cursor.getString(5));
					reminderMap.put("tdate", cursor.getString(6));
					reminderMap.put("ttime", cursor.getString(7));
					reminderMap.put("location", cursor.getString(8));
					reminderMap.put("description", cursor.getString(9));
					reminderMap.put("fileuri", cursor.getString(10));						
					}while(cursor.moveToNext());
				reminderArrayList.add(reminderMap);
				}
		
			return reminderArrayList;
	}*/
	
	public ArrayList<Cursor> getData(String Query){
		//get writable database
		SQLiteDatabase sqlDB = this.getWritableDatabase();
		String[] columns = new String[] { "mesage" };
		//an array list of cursor to save two cursors one has results from the query 
		//other cursor stores error message if any errors are triggered
		ArrayList<Cursor> alc = new ArrayList<Cursor>(2);
		MatrixCursor Cursor2= new MatrixCursor(columns);
		alc.add(null);
		alc.add(null);
		
		
		try{
			String maxQuery = Query ;
			//execute the query results will be save in Cursor c
			Cursor c = sqlDB.rawQuery(maxQuery, null);
			

			//add value to cursor2
			Cursor2.addRow(new Object[] { "Success" });
			
			alc.set(1,Cursor2);
			if (null != c && c.getCount() > 0) {

				
				alc.set(0,c);
				c.moveToFirst();
				
				return alc ;
			}
			return alc;
		} catch(SQLException sqlEx){
			Log.d("printing exception", sqlEx.getMessage());
			//if any exceptions are triggered save the error message to cursor an return the arraylist
			Cursor2.addRow(new Object[] { ""+sqlEx.getMessage() });
			alc.set(1,Cursor2);
			return alc;
		} catch(Exception ex){

			Log.d("printing exception", ex.getMessage());

			//if any exceptions are triggered save the error message to cursor an return the arraylist
			Cursor2.addRow(new Object[] { ""+ex.getMessage() });
			alc.set(1,Cursor2);
			return alc;
		}

		
	}
	
	
}