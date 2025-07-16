import java.awt.BorderLayout;
import java.awt.event.*;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.ServerSocket;
import java.net.Socket;

import javax.swing.*;


public class Server extends JFrame{
private ObjectInputStream input; 
private ObjectOutputStream output; 
private ServerSocket server;
private Socket connection;
private String message;
private JTextField enterField;
private int counter=1;
	public Server() {
		super("Server");
		enterField = new  JTextField();
		enterField.setEditable(false);
		enterField.addActionListener(
				new ActionListener(){
					public void actionPerformed(ActionEvent event){
						try {
							sendData(event.getActionCommand());
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						enterField.setText(" ");
					}
		});
		add(enterField,BorderLayout.NORTH);
		setSize(300,150);
		setVisible(true);
		// TODO Auto-generated constructor stub
		
	}
	
	public void runServer() throws IOException, ClassNotFoundException{
		server = new ServerSocket(12345,100);
		try{
			while(true){
				waitForConnection();
				getStreams();
				processConnection();
				closeConnection();
			}
		}finally{
			closeConnection();
		}
	}
	
	private void waitForConnection() throws IOException{
		System.out.println("Waiting for Connection");
		connection = server.accept();
		System.out.println("Connection "+ counter + " received from: " + connection.getInetAddress().getHostName());
		
	}
	private void getStreams() throws IOException{
		output = new ObjectOutputStream(connection.getOutputStream());
		output.flush();
		input = new ObjectInputStream(connection.getInputStream());
		System.out.println("Got I/O stream");
	}
	private void processConnection() throws ClassNotFoundException, IOException{
		setTextFieldEditable(true);
		do{
			message=(String)input.readObject();
			System.out.println(message);
		}while(!message.equals("CLIENT>>>TERMINATE"));
	}
	private void setTextFieldEditable(final boolean editable) {
		// TODO Auto-generated method stub
		SwingUtilities.invokeLater(new Runnable(){
			public void run(){
				enterField.setEditable(editable);
			}
		});
	}
	private void closeConnection() throws IOException{
		setTextFieldEditable(false);
		System.out.println("Terminating Connection");
		output.close();
		input.close();
		connection.close();
	}
	private void sendData(String message) throws IOException{
		output.writeObject("SERVER>>>" + message);
		output.flush();
		System.out.println("SERVER>>>" + message);
	}
}
