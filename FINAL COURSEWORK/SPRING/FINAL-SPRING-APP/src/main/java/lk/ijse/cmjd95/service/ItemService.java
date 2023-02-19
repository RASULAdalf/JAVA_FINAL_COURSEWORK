package lk.ijse.cmjd95.service;

import lk.ijse.cmjd95.dto.paginate.PaginatedItemResponseDto;
import lk.ijse.cmjd95.dto.request.ItemRequestDto;
import lk.ijse.cmjd95.entity.Item;


public interface ItemService {
    String saveItem(ItemRequestDto dto, String token);

    PaginatedItemResponseDto findItem(String searchText, int page, int pageSize, String token);

    String updateItem(ItemRequestDto dto, String id, String token);

    void deleteItem(String id, String token);

    PaginatedItemResponseDto getAllItems(String searchText, int page, int pageSize, String token);

    PaginatedItemResponseDto getAllItemsByCategory(String category, int page, int pageSize, String token);

    Item findItemById(String searchText, String token);
}
