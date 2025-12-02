package lk.ijse.cmjd95.dto.query_interface;

import lk.ijse.cmjd95.entity.OrderItemVendorDisplay;

import java.util.Date;

public interface OrderDataVendorDisplayInterface {
    public String getCustomerEmail();

    public Date getOrderDate();

    public OrderItemVendorDisplay[] getOrders();

    public String getState();
}
