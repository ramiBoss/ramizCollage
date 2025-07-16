import java.io.IOException;
import java.net.UnknownHostException;

import javax.swing.JFrame;


public class ClientStart {

	public static void main(String[] args) throws UnknownHostException, ClassNotFoundException, IOException {
		// TODO Auto-generated method stub
		Client client;
		if(args.length == 0)
			client = new Client("127.0.0.1");
		else
			client = new Client(args[0]);
		client.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		client.runClient();	
	}

}
