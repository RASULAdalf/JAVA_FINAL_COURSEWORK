package lk.ijse.cmjd95.controller;

import lk.ijse.cmjd95.dto.request.ItemRequestDto;
import lk.ijse.cmjd95.service.ItemService;
import lk.ijse.cmjd95.util.StandardResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Max;

@RestController
@RequestMapping("api/v1/item")
@CrossOrigin
public class ItemController {

    private final ItemService itemService;


    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping
    public ResponseEntity<StandardResponse> save(@RequestBody ItemRequestDto dto, @RequestHeader String token) {
        return new ResponseEntity<>(new StandardResponse(201, "Item Saved!", itemService.saveItem(dto, token)), HttpStatus.CREATED);
    }

    @GetMapping(path = "/find", params = {"searchText"})
    public ResponseEntity<StandardResponse> find(@RequestParam("searchText") String searchText, @RequestParam(name = "page", defaultValue = "0") int page, @RequestParam(name = "pageSize", defaultValue = "10") int pageSize, @RequestParam(name = "byWhom", defaultValue = "customer") String byWhom, @RequestParam(name = "email", defaultValue = "") String email, @RequestHeader String token) {
        return new ResponseEntity<>(new StandardResponse(200, "Item Found!", itemService.findItem(searchText, page, pageSize, token, byWhom, email)), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<StandardResponse> update(@RequestBody ItemRequestDto dto, @RequestParam String id, @RequestHeader String token) {
        return new ResponseEntity<>(new StandardResponse(201, "Item Updated!", itemService.updateItem(dto, id, token)), HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<StandardResponse> delete(@RequestParam String id, @RequestHeader String token) {
        itemService.deleteItem(id, token);
        return new ResponseEntity<>(new StandardResponse(200, "Item Deleted!", null), HttpStatus.OK);
    }

    @GetMapping(path = "/list", params = {"searchText", "page", "pageSize"})
    public ResponseEntity<StandardResponse> listAllItems(@RequestHeader String token, @RequestParam("searchText") String searchText, @RequestParam(name = "page", defaultValue = "0") int page, @RequestParam(name = "pageSize", defaultValue = "10") @Max(50) int pageSize) {
        return new ResponseEntity<>(new StandardResponse(200, "Items List", itemService.getAllItems(searchText, page, pageSize, token)), HttpStatus.OK);
    }

    @GetMapping(path = "/list/category", params = {"category", "page", "pageSize"})
    public ResponseEntity<StandardResponse> listAllItemsByCategory(@RequestHeader String token, @RequestParam("category") String category, @RequestParam(name = "page", defaultValue = "0") int page, @RequestParam(name = "pageSize", defaultValue = "10") @Max(50) int pageSize) {
        return new ResponseEntity<>(new StandardResponse(200, "Items Fetched!", itemService.getAllItemsByCategory(category, page, pageSize, token)), HttpStatus.OK);
    }

}
