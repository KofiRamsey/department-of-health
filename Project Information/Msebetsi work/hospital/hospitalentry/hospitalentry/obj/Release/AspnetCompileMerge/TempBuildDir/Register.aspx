<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="hospitalentry.Register" %>

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
            height: 488px;
        }
        .auto-style2 {
            height: 444px;
        }
        .auto-style3 {
            height: 46px;
        }
        .auto-style4 {
            height: 46px;
            width: 18px;
            font-size: xx-large;
        }
        .auto-style5 {
            height: 444px;
            width: 18px;
        }
        .auto-style6 {
            width: 18px;
        }
        .auto-style7 {
            width: 1004px;
            text-align: center;
        }
        .auto-style10 {
            width: 100%;
            height: 536px;
        }
        .auto-style11 {
            width: 197px;
        }
        .auto-style14 {
            text-decoration: underline;
            text-align: right;
            color: #000000;
        }
        .auto-style15 {
            width: 197px;
            height: 23px;
        }
        .auto-style16 {
            height: 23px;
        }
        .auto-style19 {
            width: 316px;
        }
        .auto-style21 {
            height: 23px;
            width: 316px;
        }
        .auto-style22 {
            width: 226px;
            height: 159px;
        }
        .auto-style23 {
            color: #FFFFFF;
        }
        .auto-style24 {
            width: 197px;
            color: #000000;
        }
        </style>
</head>
<body id="grad">
    <form id="form1" runat="server">
    <div>
    
        <table class="auto-style1">
            <tr>
                <td class="auto-style4">
                    <img alt="Polokwane" longdesc="hospitalImg" src="picture/Logo.png" class="auto-style22"/>
                </td>
                <td class="auto-style7" rowspan="3">
                    <h1 class="auto-style23">Register </h1>
                    <table id="page" class="auto-style10">
                        <tr>
                            <td class="auto-style24">patientID</td>
                            <td class="auto-style19">
                                <asp:Label ID="RPatientID" runat="server"></asp:Label>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style11"></td>
                            <td class="auto-style19">&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">Last 7 numbers of your ID:</td>
                            <td class="auto-style19">
                                <asp:TextBox ID="RIdNumb" runat="server" OnTextChanged="RIdNumb_TextChanged" Width="250px"></asp:TextBox>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">name and surname(Nospace)</td>
                            <td class="auto-style19">
                                <asp:TextBox ID="RclName" runat="server" OnTextChanged="RclName_TextChanged" Width="250px"></asp:TextBox>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">nationality</td>
                            <td class="auto-style19">
                                <asp:TextBox ID="RNation" runat="server" OnTextChanged="RNation_TextChanged" Width="250px"></asp:TextBox>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">billing group</td>
                            <td class="auto-style19">
                                <asp:DropDownList ID="RbillingGro" runat="server" OnSelectedIndexChanged="RbillingGro_SelectedIndexChanged">
                                    <asp:ListItem Value="Government"></asp:ListItem>
                                    <asp:ListItem Value="Private"></asp:ListItem>
                                </asp:DropDownList>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">Date of birth</td>
                            <td class="auto-style19">
                                <asp:TextBox ID="RDOB" runat="server" OnTextChanged="RDOB_TextChanged" Width="250px"></asp:TextBox>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">sex</td>
                            <td class="auto-style19">
                                <asp:TextBox ID="RSex" runat="server" OnTextChanged="RSex_TextChanged" Width="250px"></asp:TextBox>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">Martial status</td>
                            <td class="auto-style19">
                                <asp:TextBox ID="RMatialStat" runat="server" OnTextChanged="RMatialStat_TextChanged" Width="250px"></asp:TextBox>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">Race</td>
                            <td class="auto-style19">
                                <asp:DropDownList ID="RegRace" runat="server">
                                    <asp:ListItem>Black</asp:ListItem>
                                    <asp:ListItem>White</asp:ListItem>
                                    <asp:ListItem>Coloured</asp:ListItem>
                                    <asp:ListItem>Asian</asp:ListItem>
                                    <asp:ListItem>Other</asp:ListItem>
                                </asp:DropDownList>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">mailing Address</td>
                            <td class="auto-style19">
                                <asp:TextBox ID="RMail" runat="server" OnTextChanged="RMail_TextChanged" Width="250px"></asp:TextBox>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">Contact number</td>
                            <td class="auto-style19">
                                <asp:TextBox ID="RContctNum" runat="server" OnTextChanged="RContctNum_TextChanged" Width="250px"></asp:TextBox>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style15"></td>
                            <td class="auto-style21"></td>
                            <td class="auto-style16"></td>
                        </tr>
                        <tr>
                            <td class="auto-style24">
                                <h3 class="auto-style14">next of kin</h3>
                            </td>
                            <td class="auto-style19">&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">name</td>
                            <td class="auto-style19">
                                <asp:TextBox ID="RNxtknName" runat="server" OnTextChanged="RNxtknName_TextChanged" Width="250px"></asp:TextBox>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">surname</td>
                            <td class="auto-style19">
                                <asp:TextBox ID="nxtfKnSur" runat="server" Width="250px"></asp:TextBox>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">address</td>
                            <td class="auto-style19">
                                <asp:TextBox ID="RNxtknAddress" runat="server" OnTextChanged="RNxtknAddress_TextChanged" Width="250px"></asp:TextBox>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">Phone Number</td>
                            <td class="auto-style19"> 
                                <asp:TextBox ID="PhoneNumber" runat="server" OnTextChanged="PhoneNumber_TextChanged" Width="250px"></asp:TextBox>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">Relationship</td>
                            <td class="auto-style19">
                                <asp:DropDownList ID="RegnxtKinRel" runat="server">
                                    <asp:ListItem>Family</asp:ListItem>
                                    <asp:ListItem>Friend</asp:ListItem>
                                </asp:DropDownList>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style11"></td>
                            <td class="auto-style19">
                                <asp:Button ID="RegisterBut" runat="server" Height="35px" Text="Register" Width="247px" OnClick="RegisterBut_Click" BackColor="#006600" BorderColor="#006600" BorderStyle="Solid" ForeColor="White" />
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                    </table>
                    <asp:Label ID="error" runat="server"></asp:Label>
                </td>
                <td class="auto-style3">
                    <h1></h1>
                </td>
            </tr>
            <tr>
                <td class="auto-style5"></td>
                <td class="auto-style2"></td>
            </tr>
            <tr>
                <td class="auto-style6">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
