<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Perscription.aspx.cs" Inherits="hospitalentry.Perscription" %>

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
            height: 6px;
            text-align: center;
        }
        .auto-style8 {
            height: 346px;
        }
        .auto-style20 {
            width: 419px;
            height: 248px;
        }
        .auto-style25 {
            width: 420px;
        }
        .auto-style26 {
            height: 346px;
            width: 420px;
        }
        </style>
</head>
<body style="height: 650px; width: 99%">
    <form id="form1" runat="server">
    <div>
    
        <table style="width: 100%; height: 410px;">
            <tr>
                <td class="auto-style3" colspan="3">
                       <img alt="Polokwane" longdesc="hospitalImg" src="picture/Logo.png" class="auto-style20" />
                </td>
            </tr>
            <tr>
                <td class="auto-style26">&nbsp;</td>
                <td class="auto-style8">
                    <asp:GridView ID="Medication" runat="server" CellPadding="4" ForeColor="#333333" GridLines="None" Height="180px" OnLoad="Medication_Load" PageSize="100" Width="783px">
                        <AlternatingRowStyle BackColor="White" />
                        <EditRowStyle BackColor="#7C6F57" />
                        <FooterStyle BackColor="#1C5E55" Font-Bold="True" ForeColor="White" />
                        <HeaderStyle BackColor="#1C5E55" Font-Bold="True" ForeColor="White" />
                        <PagerStyle BackColor="#666666" ForeColor="White" HorizontalAlign="Center" />
                        <RowStyle BackColor="#E3EAEB" />
                        <SelectedRowStyle BackColor="#C5BBAF" Font-Bold="True" ForeColor="#333333" />
                        <SortedAscendingCellStyle BackColor="#F8FAFA" />
                        <SortedAscendingHeaderStyle BackColor="#246B61" />
                        <SortedDescendingCellStyle BackColor="#D4DFE1" />
                        <SortedDescendingHeaderStyle BackColor="#15524A" />
                    </asp:GridView>
                </td>
                <td class="auto-style8">&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style25">
                    <asp:Button ID="btnDropData" runat="server" Text="Kill Todays" />
                </td>
                <td class="auto-style2">
                    <asp:Label ID="error" runat="server"></asp:Label>
                    <asp:Label ID="todays" runat="server"></asp:Label>
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>

