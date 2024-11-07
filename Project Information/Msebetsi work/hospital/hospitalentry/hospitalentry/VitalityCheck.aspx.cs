/* File name:           HospitalEntry
 * Author:              Carlos Roberto Herrera
 * Created:             12/07/2016
 * Operating Sysytem:   Windows 7
 * 
 * Description:         the Website serves to computerise a Hospital.
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Configuration;
using System.Data.OleDb;
using System.Data;
using System.IO;
using System.Drawing;
using System.Collections;

namespace hospitalentry
{
    public partial class VitalityCheck : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void txtFileNum_TextChanged(object sender, EventArgs e)
        {
            int FileN = Convert.ToInt32(txtFileNum.Text) ;
            
            try
            {
               
                //this is done to find the Id of the user and use it to retrieve all its data
                //this is usered to connect to the webservice 
                Service.Service s = new Service.Service();
                s.ConnectToDatabase();
                DataSet ds = s.PatientsLoad(FileN);
                //this is used to create a reader using a dataset
                DataTableReader dbReader = ds.Tables[0].CreateDataReader();
                //this determines if there is user with the text that were just added in the textBoxes
                while (dbReader.Read())
                {
                    PatName.Text = (string)dbReader["PatientName"];
                }
                s.DisconnectDatabase();
                
            }
            catch (Exception ex)
            {
                //store all errors in a string
                error.Text = ex.Message;
            }
            try
            {
                //this is usered to connect to the webservice
                Service.Service s = new Service.Service();
                //Connection to the Database on the WebService
                s.ConnectToDatabase();
                DataSet ds = s.VitaitySel(FileN);
                DataTableReader dbReader = ds.Tables[0].CreateDataReader();
                //this determines if there is user with the text that were just added in the textBoxes

                //PatName.Text = (string)dbReader["PatiName"];
                //PatiName, FileNumber, age, Ward, Doctor, Gender, DateOfAdmittance, PhoneNumber, 
                //AddmitedBy, ProvisionalDiagnosis, Classification, RecieveTreat, DischargeDate, 
                //FinalDiagnosis
                while (dbReader.Read())
                {
                    lblBp.Text = (string)dbReader["BP"];
                    lblPulse.Text = (string)dbReader["Pulse"];
                    lblTemp.Text = (string)dbReader["Temp"];
                    lblVom.Text = (string)dbReader["Vomiting"];
                    lblStool.Text = (string)dbReader["stool"];
                    lblPH.Text = (string)dbReader["PH"];
                    lblProt.Text = (string)dbReader["Protein"];
                    lblGlu.Text = (string)dbReader["Glucose"];
                    lblBil.Text = (string)dbReader["Billirubin"];
                    lblKet.Text = (string)dbReader["Ketones"];
                    lblBlood.Text = (string)dbReader["Blood"];
                    lblNut.Text = (string)dbReader["Nutirents"];
                    lblUro.Text = (string)dbReader["Urobinegen"];


                }
                s.DisconnectDatabase();

            }
            catch (Exception ex)
            {
                //store all errors in a string
                error.Text = ex.Message;
            }
        }
    }
}