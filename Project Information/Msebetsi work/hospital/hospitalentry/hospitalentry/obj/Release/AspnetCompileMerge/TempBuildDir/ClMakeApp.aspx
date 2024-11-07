<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ClMakeApp.aspx.cs" Inherits="hospitalentry.Mak" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        #page {
            border-style: solid;
            border-color: rgb(204, 204, 204);
            border-width: 1px 1px;
            position: relative;
        }
        #page {
            background-color: #FFF;
            background: rgba(255,255,255, 0.2);
            background-clip: padding-box;
        }
        #menu {
            background-color:rgb(30,23,31);
	        padding-top:10px;	
	        padding-left: 15px;
	        padding-right:15px;
	        padding-bottom:15px;
        }
        #menu a {
	        text-decoration:none;
	        z-index:2;
	        padding-top:10px;	
	        padding-left: 15px;
	        padding-right:15px;
	        padding-bottom:15px;
        }
        #menu a:hover, a:active{
            background-color:rgb(46,36,47);
	        text-decoration:none;
	        z-index:2;
	        color:black;
        }
        body {
            background:url('picture/Back.jpg') #A98436 no-repeat left top;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            background-size: cover;
            background-size: 100% 100%;
            width: 100%;
       }
        .auto-style1 {
            width: 100%;
            height: 496px;
        }
        .auto-style3 {
            width: 47px;
        }
        .auto-style4 {
            height: 452px;
            width: 47px;
        }
        .auto-style5 {
            width: 1569px;
        }
        .auto-style6 {
            height: 452px;
            width: 1569px;
        }
        .auto-style7 {
            text-align: center;
        }
        .auto-style8 {
            width: 297px;
        }
        .auto-style11 {
            width: 53px;
        }
        .auto-style13 {
            height: 452px;
            width: 53px;
        }
        .auto-style14 {
            width: 733px;
        }
        .auto-style15 {
            width: 63%;
        }
        .auto-style16 {
            width: 1569px;
            text-align: center;
        }

        .auto-style18 {
            width: 243px;
            height: 174px;
        }

    </style>
</head>
<body id="grad">
    <form id="form1" runat="server">
    <div>
    
        <table class="auto-style1">
            <tr>
                <td class="auto-style3">
                    <img alt="Polokwane" longdesc="hospitalImg" src="picture/Logo.png" class="auto-style18" />
                </td>
                <td class="auto-style5">
                    <h1 class="auto-style7">Make an Apointments</h1>
                </td>
                <td class="auto-style11">&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style4"></td>
                <td class="auto-style6">
                    <table id="page" class="auto-style15">
                        <tr>
                            <td class="auto-style8">Clients ID</td>
                            <td class="auto-style14">
                                <asp:Label ID="lblPatID" runat="server"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style8">PatientName</td>
                            <td class="auto-style14">
                                <asp:Label ID="PatientsName" runat="server"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style8">Doctors Name</td>
                            <td class="auto-style14">
                                <asp:DropDownList ID="ApDoctorsName" runat="server" Width="124px" OnSelectedIndexChanged="ApDoctorsName_SelectedIndexChanged" OnLoad="ApDoctorsName_Load">
                                </asp:DropDownList>
                                <asp:Label ID="DoctorsID" runat="server"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style8">Date</td>
                            <td class="auto-style14">
                                <asp:Calendar ID="CalBookDate" runat="server" BackColor="White" BorderColor="White" BorderWidth="1px" Font-Names="Verdana" Font-Size="9pt" ForeColor="Black" Height="190px" NextPrevFormat="FullMonth" Width="350px" OnSelectionChanged="CalBookDate_SelectionChanged">
                                    <DayHeaderStyle Font-Bold="True" Font-Size="8pt" />
                                    <NextPrevStyle Font-Bold="True" Font-Size="8pt" ForeColor="#333333" VerticalAlign="Bottom" />
                                    <OtherMonthDayStyle ForeColor="#999999" />
                                    <SelectedDayStyle BackColor="#333399" ForeColor="White" />
                                    <TitleStyle BackColor="White" BorderColor="Black" BorderWidth="4px" Font-Bold="True" Font-Size="12pt" ForeColor="#333399" />
                                    <TodayDayStyle BackColor="#CCCCCC" />
                                </asp:Calendar>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style8">Reason for Appointment</td>
                            <td class="auto-style14">
                                <asp:TextBox ID="ApRsnFrAppoin" runat="server" Height="78px" Width="341px" OnTextChanged="ApRsnFrAppoin_TextChanged" Font-Names="Arial" Font-Size="Large"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style8"></td>
                            <td class="auto-style14">
                                <asp:Button ID="ApBook" runat="server" Text="Book" Width="234px" OnClick="ApBook_Click" />
                            </td>
                        </tr>
                        <asp:Label ID="lblpatIDNumb" runat="server"></asp:Label>
                    </table>
                    <asp:Label ID="error" runat="server"></asp:Label>
                </td>
                <td class="auto-style13"></td>
            </tr>
            <tr>
                <td class="auto-style3">&nbsp;</td>
                <td class="auto-style16">
                    <asp:Button ID="LogOutbtn" runat="server" Text="LogOut" Width="261px" OnClick="LogOutbtn_Click" />
                </td>
                <td class="auto-style11">&nbsp;</td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
