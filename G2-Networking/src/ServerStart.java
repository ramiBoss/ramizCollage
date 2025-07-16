import java.io.IOException;

import javax.swing.JFrame;


public class ServerStart {

	public static void main(String[] args) throws ClassNotFoundException, IOException {
		// TODO Auto-generated method stub
		Server server = new Server();
		server.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		server.runServer();
	}

}
