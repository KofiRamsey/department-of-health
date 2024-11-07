<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Appointments.aspx.cs" Inherits="hospitalentry.Appointments" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        #pages {
            border-style: solid;
            border-color: rgb(204, 204, 204);
            border-width: 1px 1px;
            position: relative;
        }
        #pages {
            background-color: #FFF;
            background: rgba(255,255,255, 0.2);
            background-clip: padding-box;
        }
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
            width: 95%;
            height: 484px;
        }
        .auto-style4 {
            width: 250px;
        }
        .auto-style5 {
            height: 200px;
            width: 629px;
        }
        .auto-style6 {
            width: 1146px;
        }
        .auto-style8 {
            height: 381px;
            width: 250px;
            background-color:rgb(30,23,31);
        }
        .auto-style10 {
            height: 381px;
        }
        .auto-style11 {
            width: 1146px;
            text-align: center;
        }
        .auto-style12 {
            height: 200px;
            width: 250px;
            background-color:rgb(30,23,31);
        }
        .auto-style14 {
            width: 213px;
            height: 161px;
        }
        .auto-style15 {
            height: 204px;
            width: 250px;
            background-color:rgb(30,23,31);
        }
        .auto-style16 {
            height: 204px;
        }
        .auto-style18 {
            text-decoration: none;
        }
        .auto-style19 {
            color: #FFFFFF;
        }
        .auto-style22 {
            left: 3px;
            top: -2px;
            height: 151px;
            width: 391px;
            margin-left: 18px;
        }
        #page0 {
            border-style: solid;
            border-color: rgb(204, 204, 204);
            border-width: 1px 1px;
            position: relative;
        }
        #page0 {
            background-color: #FFF;
            background: rgba(255,255,255, 0.2);
            background-clip: padding-box;
        }
        .auto-style23 {
            left: 1px;
            top: 0px;
            height: 151px;
            width: 391px;
            margin-left: 37px;
        }
        .auto-style24 {
            font-size: larger;
            color: #FFFFFF;
        }
        .auto-style25 {
            text-align: center;
        }
        .auto-style26 {
            height: 200px;
            width: 530px;
        }
        .auto-style28 {
            left: -1px;
            top: -47px;
            width: 835px;
            margin-left: 41px;
            margin-right: 0px;
        }
        .auto-style29 {
            margin-left: 31px;
        }
        .auto-style30 {
            height: 200px;
        }
        .auto-style31 {
            color: #3399FF;
        }
    </style>
</head>
<body  style="width: 111%; height: 832px">
    <form id="form1" runat="server">
    <div>
    
        <table class="auto-style1">
            <tr>
                <td class="auto-style12"><img alt="Polokwane"  src="picture/Logo.png" class="auto-style14" /></td>
                <td class="auto-style26">
                    
                    <div id="page" class="auto-style23">

                        <h1>
                            <asp:Label ID="lblDocID" runat="server" CssClass="auto-style31"></asp:Label>
                        </h1>

                    </div>
                    
                </td>
                <td class="auto-style5">
                    
                    <div id="page0" class="auto-style22">

                        <h1 class="auto-style25">
                            <asp:Label ID="lblTime" runat="server" CssClass="auto-style24" Font-Names="Felix Titling" Font-Size="60px"></asp:Label>
                        </h1>

                    </div>
                    
                </td>
                <td class="auto-style30"></td>
            </tr>
            <tr>
                <td class="auto-style15">
                     <a id="menu" href="Appointments.aspx" class="auto-style18"><span class="auto-style19">Appointments</span></a><br class="auto-style19"/><br class="auto-style19"/><br class="auto-style19"/><a id="menu"  href="doctorsDiagn.aspx" class="auto-style18" ><span class="auto-style19">View Clients History</span></a><br class="auto-style19"/><br class="auto-style19"/><br class="auto-style19"/><a id="menu" href="MakAppoint.aspx" class="auto-style18"><span class="auto-style19">Make an Appointment</span></a></td>
                <td class="auto-style11" rowspan="2" colspan="2">
                     <div id="pages" class="auto-style28">
                         <br/><br/><br/><br/>
                         <asp:GridView ID="TodaysAp" runat="server" Height="238px" Width="765px" OnLoad="TodaysAp_Load" OnSelectedIndexChanged="TodaysAp_SelectedIndexChanged" CellPadding="4" CssClass="auto-style29" Font-Bold="True" ForeColor="#333333" GridLines="Horizontal" BackColor="White" BorderStyle="Outset" PageSize="20" ShowFooter="True">
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
                         <br/><br/><br/><br/>
                     </div>
                         <br />
                    <asp:Label ID="error" runat="server"></asp:Label>
                </td>
                <td class="auto-style16"></td>
            </tr>
            <tr>
                <td class="auto-style8">&nbsp;</td>
                <td class="auto-style10"></td>
            </tr>
            <tr>
                <td class="auto-style4">&nbsp;</td>
                <td class="auto-style6" colspan="2">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
