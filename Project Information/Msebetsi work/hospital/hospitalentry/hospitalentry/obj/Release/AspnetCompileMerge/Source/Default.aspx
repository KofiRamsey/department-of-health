<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="hospitalentry.Default" %>

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
        body {
            background:url('picture/Back.jpg') #A98436 no-repeat left top;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            background-size: cover;
            background-size: 100% 100%;
            width: 100%;
       }
        .auto-style2 {
            width: 1168px;
        }
        .auto-style3 {
            height: 27px;
            text-align: center;
        }
        .auto-style6 {
            width: 142px;
            height: 346px;
        }
        .auto-style7 {
            width: 1168px;
            height: 346px;
        }
        .auto-style8 {
            height: 346px;
        }
        .auto-style10 {
            width: 96%;
            height: 261px;
        }
        .auto-style11 {
            width: 310px;
            text-align: center;
        }
        .auto-style13 {
            width: 310px;
            height: 40px;
            text-align: center;
        }
        .auto-style14 {
            width: 135px;
            height: 40px;
        }
        .auto-style15 {
            height: 40px;
            width: 334px;
        }
        .auto-style16 {
            text-align: center;
            width: 334px;
        }
        .auto-style17 {
            width: 310px;
            height: 148px;
        }
        .auto-style18 {
            width: 135px;
            height: 148px;
        }
        .auto-style19 {
            height: 148px;
            text-align: center;
            color: #FFFFFF;
            width: 334px;
        }
        .auto-style20 {
            width: 509px;
            height: 248px;
        }
        .auto-style21 {
            margin-left: 60px;
        }
        .auto-style22 {
            color: #FFFFFF;
        }
        .auto-style23 {
            text-align: center;
            color: #FFFFFF;
        }
        .auto-style24 {
            width: 135px;
        }
        .auto-style25 {
            width: 142px;
        }
        .auto-style26 {
            margin-left: 53px;
        }
    </style>
</head>
<body style="height: 650px; width: 99%">
    <form id="form1" runat="server">
    <div>
    
        <table style="width: 100%; height: 410px;">
            <tr>
                <td class="auto-style3" colspan="3">&nbsp;&nbsp;&nbsp;
                       <img alt="Polokwane" longdesc="hospitalImg" src="picture/Logo.png" class="auto-style20" /></td>
                </td>
            </tr>
            <tr>
                <td class="auto-style6"></td>
                <td class="auto-style7">
                    <table class="auto-style10">
                        <tr>
                            <td class="auto-style13">
                                <h2 class="auto-style22">Login</h2>
                            </td>
                            <td class="auto-style14"></td>
                            <td class="auto-style15">
                                <h2 class="auto-style23">Register</h2>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style17"><span class="auto-style22">IDnumber</span>:&nbsp;&nbsp;
                                <asp:TextBox ID="IDnumber" runat="server" OnTextChanged="IDnumber_TextChanged" CssClass="auto-style21" Width="127px"></asp:TextBox>
                                <br />
                                <br />
                                <span class="auto-style22">FileNumber:&nbsp;</span>
                                <asp:TextBox ID="fileNumb" runat="server" OnTextChanged="ClName_TextChanged" CssClass="auto-style26" Width="127px"></asp:TextBox>
                            </td>
                            <td class="auto-style18"></td>
                            <td class="auto-style19">If client has never Registered or come to this hospital click on the button bellow to go to the registery form</td>
                        </tr>
                        <tr>
                            <td class="auto-style11">
                                <asp:Button ID="BookClient" runat="server" Height="40px" OnClick="BookClient_Click" Text="Book!" Width="241px" BackColor="#006600" BorderColor="#006600" BorderStyle="Solid" Font-Bold="True" ForeColor="White" />
                            </td>
                            <td class="auto-style24">&nbsp;</td>
                            <td class="auto-style16">
                                <asp:Button ID="RegiBut" runat="server" Height="40px" OnClick="RegiBut_Click" Text="Register Me" Width="241px" BackColor="#006600" BorderColor="#006600" BorderStyle="Solid" Font-Bold="True" ForeColor="White" />
                            </td>
                        </tr>
                    </table>
                    <asp:Label ID="error" runat="server"></asp:Label>
                </td>
                <td class="auto-style8"></td>
            </tr>
            <tr>
                <td class="auto-style25">&nbsp;</td>
                <td class="auto-style2">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
