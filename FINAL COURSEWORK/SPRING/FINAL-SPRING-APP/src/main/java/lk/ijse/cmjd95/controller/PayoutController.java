package lk.ijse.cmjd95.controller;

import lk.ijse.cmjd95.dto.request.ItemRequestDto;
import lk.ijse.cmjd95.dto.request.PayoutRequestDto;
import lk.ijse.cmjd95.service.PayoutService;
import lk.ijse.cmjd95.util.StandardResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Max;

@RestController
@RequestMapping("api/v1/payout")
@CrossOrigin
public class PayoutController {
    private final PayoutService payoutService;

    public PayoutController(PayoutService payoutService) {
        this.payoutService = payoutService;
    }

    @PostMapping
    public ResponseEntity<StandardResponse> save(@RequestBody PayoutRequestDto dto, @RequestHeader String token) {
        return new ResponseEntity<>(new StandardResponse(201, "Payout Saved!", payoutService.savePayout(dto, token)), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<StandardResponse> update(@RequestBody PayoutRequestDto dto, @RequestParam String id, @RequestHeader String token) {
        return new ResponseEntity<>(new StandardResponse(201, "Item Updated!", payoutService.updatePayout(dto, id, token)), HttpStatus.CREATED);
    }

    @GetMapping(path = "/list", params = {"vendorEmail", "page", "pageSize"})
    public ResponseEntity<StandardResponse> listAllItems(@RequestHeader String token, @RequestParam("vendorEmail") String vendorEmail, @RequestParam(name = "page", defaultValue = "0") int page, @RequestParam(name = "pageSize", defaultValue = "10") @Max(50) int pageSize) {
        return new ResponseEntity<>(new StandardResponse(200, "Items List", payoutService.getAllPayoutsByVendorEmail(vendorEmail, page, pageSize, token)), HttpStatus.OK);
    }

}
