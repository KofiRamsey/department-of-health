<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="doctorsDiagn.aspx.cs" Inherits="hospitalentry.doctorsDiagn" %>

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
            height: 500px;
        }
        .auto-style3 {
            width: 870px;
        }
        .auto-style4 {
            width: 250px;
            height: 91px;
            background-color:rgb(30,23,31);
        }
        .auto-style5 {
            width: 870px;
            height: 91px;
        }
        .auto-style6 {
            height: 91px;
        }
        .auto-style7 {
            text-align: center;
        }
        .auto-style8 {
            width: 250px;
            height: 400px;
            background-color:rgb(30,23,31);
        }
        .auto-style10 {
            height: 424px;
        }
        .auto-style17 {
            width: 870px;
            text-align: center;
        }
        .auto-style21 {
            width: 250px;
        }
        .auto-style22 {
            width: 213px;
            height: 161px;
        }
        .auto-style24 {
            width: 250px;
            height: 189px;
            background-color: rgb(30,23,31);
        }
        .auto-style25 {
            height: 189px;
        }
        .auto-style26 {
            color: #FFFFFF;
        }
        .auto-style28 {
            text-decoration: none;
        }
        .auto-style29 {
            text-align: left;
            color: #FFFFFF;
        }
        .auto-style30 {
            margin-left: 68px;
            left: 1px;
            top: 0px;
            height: 605px;
        }
        .auto-style31 {
            width: 100%;
            height: 232px;
        }
        .auto-style32 {
            height: 26px;
        }
        .auto-style33 {
            height: 39px;
        }
        .auto-style34 {
            text-align: left;
        }
    </style>
</head>
<body style="width: 100%; height: 100%">
    <form id="form1" runat="server">
    <div>
    
        <table class="auto-style1">
            <tr>
                <td class="auto-style4">
                    <img alt="Polokwane"  src="picture/Logo.png" class="auto-style22"/>
                </td>
                <td class="auto-style5">
                    <h1 class="auto-style7">Doctors Diagnosis </h1>
                </td>
                <td class="auto-style6"></td>
            </tr>
            <tr>
                <td class="auto-style24">
                     <a id="menu" href="Appointments.aspx" class="auto-style28" ><span class="auto-style26">Appointments</span></a><br class="auto-style26"><br class="auto-style26"><br class="auto-style26"><a id="menu"  href="doctorsDiagn.aspx" class="auto-style28" ><span class="auto-style26">View Clients History</span></a><br class="auto-style26"><br class="auto-style26"><br class="auto-style26"><a id="menu" href="MakAppoint.aspx" class="auto-style28" ><span class="auto-style26">Make an Appointment</span></a></td>
                <td class="auto-style17" rowspan="2">
                    <table id="page" class="auto-style30">
                        <tr>
                            <td class="auto-style13"></td>
                            <td class="auto-style15">
                                <h1 class="auto-style29">Diagnosis Form</h1>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style13">patient ID</td>
                            <td class="auto-style15">
                                <asp:TextBox ID="TextBox2" runat="server" OnTextChanged="TextBox1_TextChanged" Width="336px"></asp:TextBox>
                                <asp:Button ID="Button2" runat="server" OnClick="Button1_Click" Text="search client" BackColor="#006600" BorderColor="#006600" BorderStyle="Solid" ForeColor="White" />
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style13">&nbsp;</td>
                            <td class="auto-style34">
                                <asp:Label ID="PatName" runat="server"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style14" colspan="2">
                                <asp:GridView ID="ClientsInfo" runat="server" Height="190px" OnSelectedIndexChanged="ClientsInfo_SelectedIndexChanged" Width="654px" CellPadding="4" ForeColor="#333333" GridLines="None" PageSize="11">
                                    <AlternatingRowStyle BackColor="White" />
                                    <FooterStyle BackColor="#990000" Font-Bold="True" ForeColor="White" />
                                    <HeaderStyle BackColor="#990000" Font-Bold="True" ForeColor="White" />
                                    <PagerStyle BackColor="#FFCC66" ForeColor="#333333" HorizontalAlign="Center" />
                                    <RowStyle BackColor="#FFFBD6" ForeColor="#333333" />
                                    <SelectedRowStyle BackColor="#FFCC66" Font-Bold="True" ForeColor="Navy" />
                                    <SortedAscendingCellStyle BackColor="#FDF5AC" />
                                    <SortedAscendingHeaderStyle BackColor="#4D0000" />
                                    <SortedDescendingCellStyle BackColor="#FCF6C0" />
                                    <SortedDescendingHeaderStyle BackColor="#820000" />
                                </asp:GridView>
                                <br />
                                <br />
                                <table class="auto-style31">
                                    <tr>
                                        <td class="auto-style33" colspan="3">
                                            <h2>Add Diagnosis</h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="auto-style32">Doctors Name</td>
                                        <td class="auto-style32">
                                            <asp:Label ID="DocName" runat="server"></asp:Label>
                                        </td>
                                        <td class="auto-style32"></td>
                                    </tr>
                                    <tr>
                                        <td class="auto-style20">active problem</td>
                                        <td class="auto-style19">
                                            <asp:TextBox ID="DiaActProb" runat="server" Width="300px" Height="30px"></asp:TextBox>
                                        </td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td class="auto-style20">physical examination report</td>
                                        <td class="auto-style19">
                                            <asp:TextBox ID="DiaPhysExamRep" runat="server" Width="300px" Height="30px"></asp:TextBox>
                                        </td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td class="auto-style20">Recomended Medication</td>
                                        <td class="auto-style19">
                                            <asp:TextBox ID="DiaRecomMeds" runat="server" Width="300px" Height="30px"></asp:TextBox>
                                            <br />
                                            <asp:DropDownList ID="Medication" runat="server" OnLoad="Medication_Load1" OnSelectedIndexChanged="Medication_SelectedIndexChanged1">
                                            </asp:DropDownList>
                                        </td>
                                        <td>
                                            <asp:Button ID="AddDiagbtn" runat="server" Text="Submit" Width="99px" BackColor="#006600" BorderColor="#006600" BorderStyle="Solid" ForeColor="White" OnClick="AddDiagbtn_Click" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
                <td class="auto-style25"></td>
            </tr>
            <tr>
                <td class="auto-style8"></td>
                <td class="auto-style10"></td>
            </tr>
            <tr>
                <td class="auto-style21">&nbsp;</td>
                <td class="auto-style3">
                    <asp:Label ID="error" runat="server"></asp:Label>
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
