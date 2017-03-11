import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTabbedPane;
import javax.swing.JTextArea;
import javax.swing.SwingConstants;


@SuppressWarnings("serial")
public class TabbedFrame extends JFrame {
	
	public TabbedFrame(){
		super("Employee Application");
		JTabbedPane tabbedPane=new JTabbedPane();
		EmpOp emp=new EmpOp();
		/*******************************/
		JPanel panel1=new JPanel();
		JTextArea empId=new JTextArea(2,3);
		panel1.add(empId);
		JTextArea fname=new JTextArea(2,8);
		panel1.add(fname);
		JTextArea lname=new JTextArea(2,8);
		panel1.add(lname);
		JTextArea age=new JTextArea(2,3);
		panel1.add(age);
		JTextArea salary=new JTextArea(2,5);
		panel1.add(salary);
		JButton addButton=new JButton("ADD");
		panel1.add(addButton);
		tabbedPane.addTab("ADD",panel1);
		addButton.addActionListener(new ActionListener(){

			@Override
			public void actionPerformed(ActionEvent arg0) {
				// TODO Auto-generated method stub
				try {
					emp.add(Integer.parseInt(empId.getText()), fname.getText(), lname.getText(), Integer.parseInt(age.getText()), Float.parseFloat(salary.getText()));
					empId.setText(null);
					fname.setText(null);
					lname.setText(null);
					age.setText(null);
					salary.setText(null);
				} catch (NumberFormatException | IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			
		});
		/*****************************/
		JPanel panel2=new JPanel();
		JTextArea Id=new JTextArea(2,3);
		panel2.add(Id);
		JButton search=new JButton("SEARCH");
		panel2.add(search);
		tabbedPane.addTab("SEARCH",panel2);
		search.addActionListener(new ActionListener(){

			@Override
			public void actionPerformed(ActionEvent arg0) {
				// TODO Auto-generated method stub
				
			}
			
		});
		/**********************************/
		JPanel panel3=new JPanel();
		JTextArea dId=new JTextArea(2,3);
		panel3.add(dId);
		JButton delete=new JButton("DELETE");
		panel3.add(delete);
		tabbedPane.addTab("DELETE",panel3);
		delete.addActionListener(new ActionListener(){

			@Override
			public void actionPerformed(ActionEvent arg0) {
				// TODO Auto-generated method stub
				emp.deleteRecord(Integer.parseInt(dId.getText()));
				dId.setText(null);
			}
			
		});
		/*********************************************/
		add(tabbedPane);
		/*JLabel label1=new JLabel("DISPLAY",SwingConstants.CENTER);
		JLabel label1=new JLabel("ADD",SwingConstants.CENTER);
		JLabel label1=new JLabel("ADD",SwingConstants.CENTER);*/
	}
}
