import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.EOFException;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

import javax.swing.*;


public class Client extends JFrame{
private String chatServer;
private Socket client;
private JTextField enterField;
private JTextField msgField;
private ObjectOutputStream output;
private ObjectInputStream input;
private JPanel panel;
private JTextArea textArea;
private JButton sendButton;
private JLabel sendLabel;
String message;
String userName=null;
private Font font;

	public Client(String host) {
		super("Client");
		// TODO Auto-generated constructor stub
		chatServer=host;
		/*sPane =new JScrollPane();
		msgField = new JTextField();
		msgField.setEditable(false);*/
		do{
		userName=JOptionPane.showInputDialog("USERNAME PLEASE : ");
		}while(userName == null);
		System.out.print("\n"+userName+"\n");
		font = new Font("Serif", Font.ITALIC, 20);
		textArea = new JTextArea();
		textArea.setEditable(false);
		textArea.setFont(font);
		textArea.setBackground(Color.WHITE);
		//panel = new JPanel();
		enterField = new JTextField();
		enterField.setFont(font);
		//enterField.setSize(200,10);
		//sendButton = new JButton();
		//sendButton.setSize(100,10);
		//sendLabel = new JLabel("Send");
		enterField.setEditable(false);
		//sendButton.add(sendLabel);
		enterField.addActionListener(
				new ActionListener(){
					public void actionPerformed(ActionEvent event){
						try {
							sendData(event.getActionCommand());
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						enterField.setText("");
					}
		});
		//panel.setSize(300,140);
		//panel.setBackground(Color.WHITE);
		//panel.setVisible(true);
		//add(panel,BorderLayout.SOUTH);
		add(enterField,BorderLayout.SOUTH);
		//add(sendButton);
		add(textArea);
		add(new JScrollPane(textArea),BorderLayout.CENTER);
		setBackground(Color.WHITE);
		setSize(300,150);
		setVisible(true);
		
	}
	
	public void runClient() throws ClassNotFoundException, IOException{
		try{
		connectToServer();
		getStreams();
		processConnection();
		closeConnection();
		System.out.println("Client Down");
		}catch(IOException ioException){
			System.out.println("Chat Over some ioExceptions occurs");
			//ioException.printStackTrace();
		}finally{
			closeConnection();
		}
	}
	
	private void connectToServer() throws UnknownHostException, IOException{
		System.out.println("Attempting connection");
		client=new Socket(InetAddress.getByName(chatServer),12345);
		System.out.println("Connected to:"+ client.getInetAddress().getHostName());
	}
	
	private void getStreams() throws IOException{
		output = new ObjectOutputStream(client.getOutputStream());
		output.flush();
		input = new ObjectInputStream(client.getInputStream());
		System.out.println("Got I/O streams");
	}
	
	private void processConnection() throws ClassNotFoundException, IOException{
		setTextFieldEditable(true);
		do{
			message = (String)input.readObject();
			displayMessage("\n"+message,Color.BLUE);
			System.out.println(message);
		}while(!message.equals("SERVER>>>TERMINATE"));
	}
	private void displayMessage(final String message,Color c) {
		// TODO Auto-generated method stub	
		SwingUtilities.invokeLater(new Runnable(){
			public void run(){
				textArea.setForeground(c);
				textArea.append(message);
			}
		});
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
		System.out.println("Closing Connection");
		output.close();
		input.close();
		client.close();
	}
	
	private void sendData(String message) throws IOException{
		output.writeObject(userName+">>>"+message);
		output.flush();
		System.out.println(userName+">>>"+message);
		displayMessage("\n"+userName+">>>"+ message,Color.BLACK);
	}

}
