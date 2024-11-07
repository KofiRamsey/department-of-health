<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DocRegister.aspx.cs" Inherits="hospitalentry.DocRegister" %>

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
            height:100%;
       }
        .auto-style1 {
            width: 94%;
            height: 610px;
        }
        .auto-style13 {
            height: 322px;
            width: 266px;
        }
        .auto-style15 {
            height: 165px;
            text-align: center;
        }
        .auto-style19 {
            width: 153%;
            height: 131px;
            margin-left: 0px;
        }
        .auto-style28 {
            width: 346px;
            height: 228px;
        }
        .auto-style30 {
            width: 90px;
            text-align: center;
            height: 47px;
        }
        .auto-style31 {
            height: 47px;
            width: 250px;
        }
        .auto-style35 {
            width: 171px;
            height: 322px;
            text-align: center;
        }
        .auto-style36 {
            width: 171px;
            height: 23px;
        }
        .auto-style43 {
            width: 250px;
        }
        .auto-style44 {
            width: 266px;
            height: 23px;
        }
        .auto-style45 {
            width: 301px;
            height: 322px;
            text-align: center;
        }
        .auto-style46 {
            width: 301px;
            height: 23px;
        }
        .auto-style47 {
            width: 90px;
            text-align: center;
            color: #000000;
        }
    </style>
</head>
<body style="width: 90%; height: 90%; margin-bottom: 40px;">
    <form id="form1" runat="server">
    <div>
    
        <table class="auto-style1">
            <tr>
                <td class="auto-style15" colspan="3">
                    &nbsp;<img alt="Polokwane" longdesc="hospitalImg" src="picture/Logo.png" class="auto-style28"  /></td>
            </tr>
            <tr>
                <td class="auto-style45"></td>
                <td class="auto-style35">&nbsp;&nbsp;&nbsp;&nbsp;
                    <table id="page" align="center" class="auto-style19">
                        <tr>
                            <td class="auto-style47">UserID</td>
                            <td class="auto-style43">
                                <h2>
                                    <asp:Label ID="DocID" runat="server"></asp:Label>
                                </h2>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style47">User Name</td>
                            <td class="auto-style43">
                                <asp:TextBox ID="DocUserNam" runat="server" Width="250px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style47">Password</td>
                            <td class="auto-style43">
                                <asp:TextBox ID="DocPass" runat="server" Width="250px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style30"></td>
                            <td class="auto-style31">
                                <asp:Button ID="DocReg" runat="server" Text="Register" Width="205px" BackColor="#006600" BorderColor="#006600" BorderStyle="Solid" ForeColor="White" OnClick="DocLogin_Click" />
                            </td>
                        </tr>
                    </table>
                </td>
                <td class="auto-style13"></td>
            </tr>
            <tr>
                <td class="auto-style46"></td>
                <td class="auto-style36">
                    <asp:Label ID="error" runat="server"></asp:Label>
                </td>
                <td class="auto-style44"></td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>

