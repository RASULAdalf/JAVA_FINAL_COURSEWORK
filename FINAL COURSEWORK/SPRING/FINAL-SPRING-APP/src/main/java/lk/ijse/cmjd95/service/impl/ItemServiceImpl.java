package lk.ijse.cmjd95.service.impl;

import lk.ijse.cmjd95.dto.paginate.PaginatedItemResponseDto;
import lk.ijse.cmjd95.dto.query_interface.ItemDataInterface;
import lk.ijse.cmjd95.dto.request.ItemRequestDto;
import lk.ijse.cmjd95.dto.response.ItemResponseDto;
import lk.ijse.cmjd95.entity.Item;
import lk.ijse.cmjd95.repo.ItemRepo;
import lk.ijse.cmjd95.security.TokenValidator;
import lk.ijse.cmjd95.service.ItemService;
import lk.ijse.cmjd95.util.mapper.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {


    private final ItemRepo itemRepo;
    private final Mapper mapper;

    public ItemServiceImpl(ItemRepo itemRepo, Mapper mapper) {
        this.itemRepo = itemRepo;
        this.mapper = mapper;
    }

    @Override
    public String saveItem(ItemRequestDto dto, String token) {
        if (!TokenValidator.validateToken(token)) {
            return "Invalid Token!";
        }
        return itemRepo.save(mapper.toItem(dto)).getItemCode();
    }

    @Override
    public PaginatedItemResponseDto findItem(String searchText, int page, int pageSize, String token) {
        if (!TokenValidator.validateToken(token)) {
            return null;
        }
        Optional<Item> byId = itemRepo.findById(searchText);
        if (byId.isPresent()) {
            List<ItemResponseDto> list = new ArrayList<>();
            list.add(mapper.toItemResponseDto(byId.get()));
            return new PaginatedItemResponseDto(list, 1);
        } else {
            Page<ItemDataInterface> allItemsByDescription = itemRepo.getAllItemsByDescription(searchText, PageRequest.of(page, pageSize));
            PaginatedItemResponseDto paginatedItemResponseDto = new PaginatedItemResponseDto(mapper.toItemResponseDto(itemRepo.getAllItemsByDescription(searchText, PageRequest.of(page, pageSize))), itemRepo.getAllItemsCountByDescription(searchText));
            if (0 < paginatedItemResponseDto.getItems().size()) {
                return paginatedItemResponseDto;
            } else {
                PaginatedItemResponseDto paginatedItemResponseDto1 = new PaginatedItemResponseDto(mapper.toItemResponseDto(itemRepo.getAllItemsBySpecsDocContent(searchText, PageRequest.of(page, pageSize))), itemRepo.getAllItemsCountBySpecsDocContent(searchText));
                if (0 < paginatedItemResponseDto1.getItems().size()) {
                    return paginatedItemResponseDto1;
                } else {
                    return null;
                }
            }
        }
    }

    @Override
    public String updateItem(ItemRequestDto dto, String id, String token) {
        if (!TokenValidator.validateToken(token)) {
            return null;
        }

        Optional<Item> byId = itemRepo.findById(id);
        if (byId.isPresent()) {
            Item item = mapper.toItem(dto);
            item.setItemCode(byId.get().getItemCode());
            return itemRepo.save(item).getItemCode();
        } else {
            return null;
        }
    }

    @Override
    public void deleteItem(String id, String token) {
        if (!TokenValidator.validateToken(token)) {
            return;
        }
        itemRepo.deleteById(id);
    }

    @Override
    public PaginatedItemResponseDto getAllItems(String searchText, int page, int pageSize, String token) {
        if (!TokenValidator.validateToken(token)) {
            return null;
        }

        return new PaginatedItemResponseDto(mapper.toItemResponseDto(itemRepo.getAllItemsByDescription(searchText, PageRequest.of(page, pageSize))), itemRepo.getAllItemsCountByDescription(searchText));
    }

    @Override
    public PaginatedItemResponseDto getAllItemsByCategory(String category, int page, int pageSize, String token) {
        if (!TokenValidator.validateToken(token)) {
            return null;
        }

        return new PaginatedItemResponseDto(mapper.toItemResponseDto(itemRepo.getAllItemsByCategory(category, PageRequest.of(page, pageSize))), itemRepo.getAllItemsCountByCategory(category));
    }

    @Override
    public Item findItemById(String searchText, String token) {
        if (!TokenValidator.validateToken(token)){
            return null;
        }
        Optional<Item> byId = itemRepo.findById(searchText);
        return (byId.isPresent())? byId.get():null;
    }
}
