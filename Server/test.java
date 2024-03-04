import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;



public class test {
	public static void main (String[] args) {
		Servers testServer = new Servers();
		String[] a = new String[2];
		a[0] = "tripName";
		a[1] = "destination";
		String[] d = new String[2];
		d[0] = "Cool Test Trip";
		d[1] = "San Jose";
		try {
			ResultSet result = testServer.GetAll("TripInfo", a, d);
			while (result.next()) {
				System.out.println(result.getString("last_name") + ", " + result.getString("first_name"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}

class Servers {
	private Connection myConn = null;

	Servers() {
		
		try {
//			Get a connection to database
			myConn = DriverManager.getConnection("jdbc:mysql://localhost:3306/demo", "root" , "travelgroup");
			
		}
		catch (Exception exc) {
			exc.printStackTrace();
		}

	}

	public void Add(String table, String[] attribute, String[] data ) throws SQLException{
		// Create a statement
		Statement myStmt = this.myConn.createStatement();
		
		String sql = "insert into "+ table + " (";
		
		for (int i = 0; i <= attribute.length; i++) {
			if (i == attribute.length - 1 ) {
				sql += attribute[i];
			}else {
				sql += attribute[i] + ", ";
			}
		}
		
		sql += ") value ";
		
		for (int i = 0; i <= data.length; i++) {
			if (i == data.length - 1 ) {
				sql += data[i];
			}else {
				sql += data[i] + ", ";
			}
		}
		sql += ");";
		
		ResultSet result = myStmt.executeQuery(sql);
		
	}
	public void Remove(String table, String[] attribute, String[] data) throws SQLException{
		// Create a statement
		Statement myStmt = this.myConn.createStatement();
		
		String sql = "delete from "+ table + " where ";
		
		for (int i = 0; i <= attribute.length; i++) {
			if (i == attribute.length - 1 ) {
				sql += attribute[i] + " = "+data[i]+";";
			}else {
				sql += attribute[i] + " = "+data[i] + " AND ";
			}
		}
		
		ResultSet result = myStmt.executeQuery(sql);
		
	}
	
	public ResultSet GetAll(String table, String[] attribute, String[] data) throws SQLException{
		// Create a statement
		Statement myStmt = this.myConn.createStatement();
		
		String sql = "select * from "+ table + " where ";
		
		for (int i = 0; i <= attribute.length; i++) {
			if (i == attribute.length - 1 ) {
				sql += attribute[i] + " = "+data[i]+";";
			}else {
				sql += attribute[i] + " = "+data[i] + " AND ";
			}
		}
		
		ResultSet result = myStmt.executeQuery(sql);
		
		return result;
	}
}
