<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MakAppoint.aspx.cs" Inherits="hospitalentry.MakAppoint" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 99%;
            height: 496px;
        }
        .auto-style4 {
            height: 452px;
            width: 297px;
            text-align: left;
            background-color:rgb(30,23,31);
        }
        .auto-style5 {
            width: 1612px;
        }
        .auto-style7 {
            text-align: center;
        }
        .auto-style8 {
            width: 107px;
        }
        .auto-style11 {
            width: 53px;
        }
        .auto-style15 {
            width: 775px;
            left: 7px;
            top: -57px;
            height: 449px;
            margin-left: 58px;
            margin-top: 65px;
        }
        
        #page {
            border-style: solid;
            border-color: rgb(204, 204, 204);
            border-width: 1px 1px;
            width: 800px;
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
        .auto-style16 {
            width: 213px;
            height: 161px;
        }
        .auto-style20 {
            width: 297px;
            background-color: rgb(30,23,31);
        }
        .auto-style21 {
            width: 297px;
            text-align: left;
            height: 172px;
            background-color: rgb(30,23,31);
        }
        .auto-style22 {
            width: 1214px;
        }
        .auto-style23 {
            text-decoration: none;
        }
        .auto-style24 {
            color: #FFFFFF;
        }
        .auto-style25 {
            width: 224px;
        }
        .auto-style26 {
            width: 51px;
        }
        .auto-style27 {
            width: 297px;
            background-color: rgb(30,23,31);
            height: 151px;
        }
        .auto-style28 {
            width: 1612px;
            height: 151px;
        }
        .auto-style29 {
            width: 53px;
            height: 151px;
        }
    </style>
    <script src="javascript.js" ></script>
</head>
<body style="width: 10%; height: 100%">
    <form id="form1" runat="server" class="auto-style22">
    <div>
    
        <table class="auto-style1">
            <tr>
                <td class="auto-style27">
                    <img alt="Polokwane" class="auto-style16" src="picture/Logo.png" />
                </td>
                <td class="auto-style28">
                    <h1 class="auto-style7">Make an Apointments</h1>
                </td>
                <td class="auto-style29"></td>
            </tr>
            <tr>
                <td class="auto-style21">
                    <a id="menu" href="Appointments.aspx" class="auto-style23"><strong><span class="auto-style24">Appointments</span></strong></a><br class="auto-style24"/><br class="auto-style24" /><br class="auto-style24"/><a id="menu"  href="doctorsDiagn.aspx" class="auto-style23"><strong><span class="auto-style24">View Clients History</span></strong></a><br class="auto-style24"/><br class="auto-style24"/><br class="auto-style24"/><a id="menu" href="MakAppoint.aspx" class="auto-style23"><strong><span class="auto-style24">Make an Appointment</span></strong></a></td>
                
                <td class="auto-style5" rowspan="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <table id="page" class="auto-style15">
                        <tr>
                            <td class="auto-style26">&nbsp;</td>
                            <td class="auto-style8">Clients ID</td>
                            <td class="auto-style25">
                                <asp:TextBox ID="ApClientID" runat="server" Width="223px" OnTextChanged="ApClientID_TextChanged"></asp:TextBox>
                                <asp:Button ID="CallCli" runat="server" BackColor="#006600" BorderColor="#006600" BorderStyle="Solid" ForeColor="White" OnClick="CallCli_Click" Text="Call Client" />
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style26">&nbsp;</td>
                            <td class="auto-style8">Clients Name</td>
                            <td class="auto-style25">
                                <asp:Label ID="PatName" runat="server"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style26">&nbsp;</td>
                            <td class="auto-style8">Doctors Name</td>
                            <td class="auto-style25">
                                <asp:Label ID="DocName" runat="server"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style26">&nbsp;</td>
                            <td class="auto-style8">Date</td>
                            <td class="auto-style25">
                                <asp:Calendar ID="CalBookDate" runat="server" BackColor="White" BorderColor="White" BorderWidth="1px" Font-Names="Verdana" Font-Size="9pt" ForeColor="Black" Height="161px" NextPrevFormat="FullMonth" Width="393px">
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
                            <td class="auto-style26">&nbsp;</td>
                            <td class="auto-style8">Reason for Appointment</td>
                            <td class="auto-style25">
                                <asp:TextBox ID="ApRsnFrAppoin" runat="server" Height="164px" TextMode="MultiLine" Width="389px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style26">&nbsp;</td>
                            <td class="auto-style8"></td>
                            <td class="auto-style25">
                                <asp:Button ID="ApBook" runat="server" Text="Book" Width="234px" OnClick="ApBook_Click" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="auto-style4">&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style20">&nbsp;</td>
                <td class="auto-style5">
                    <asp:Label ID="error" runat="server"></asp:Label>
                </td>
                <td class="auto-style11">&nbsp;</td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
