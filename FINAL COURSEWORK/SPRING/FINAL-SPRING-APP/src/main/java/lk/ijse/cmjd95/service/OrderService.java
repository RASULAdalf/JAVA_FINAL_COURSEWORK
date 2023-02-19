package lk.ijse.cmjd95.service;

import lk.ijse.cmjd95.dto.paginate.PaginatedOrderResponseDto;
import lk.ijse.cmjd95.dto.request.OrderRequestDto;

import java.text.ParseException;

public interface OrderService {
    String saveOrder(OrderRequestDto dto, String token) throws ParseException;

    PaginatedOrderResponseDto findOrderById(String searchText, int page, int pageSize, String token);

    PaginatedOrderResponseDto findOrderByEmail(String searchText, int page, int pageSize, String token);

    PaginatedOrderResponseDto findOrderByDescription(String searchText, int page, int pageSize, String token);

    PaginatedOrderResponseDto findOrderByDate(String searchText, int page, int pageSize, String token);

    String updateOrder(OrderRequestDto dto, String id, String token);

    void deleteOrder(String id, String token);

    PaginatedOrderResponseDto getAllOrdersByCustomerEmail(String searchText, int page, int pageSize, String token);

    PaginatedOrderResponseDto findCustomerOrderById(String searchText, String email, int page, int pageSize, String token);

    PaginatedOrderResponseDto findCustomerOrderByEmail(String searchText, String email, int page, int pageSize, String token);

    PaginatedOrderResponseDto findCustomerOrderByDescription(String searchText, String email, int page, int pageSize, String token);

    PaginatedOrderResponseDto findCustomerOrderByDate(String searchText, String email, int page, int pageSize, String token);
    PaginatedOrderResponseDto findCustomerOrder(String searchText, String email, int page, int pageSize, String token);

}
