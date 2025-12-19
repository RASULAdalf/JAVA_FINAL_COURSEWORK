package lk.ijse.cmjd95.repo;

import lk.ijse.cmjd95.dto.query_interface.PayoutDataInterface;
import lk.ijse.cmjd95.entity.Item;
import lk.ijse.cmjd95.entity.Payout;
import lk.ijse.cmjd95.entity.PayoutItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
@EnableMongoRepositories
public interface PayoutRepo extends MongoRepository<Payout,String> {
    @Query(value = "{vendorEmail: '?0'}", sort = "{payoutDate: -1}")
    Page<PayoutDataInterface> getPayoutsByVendorEmail(String vendorEmail, Pageable pageable);

    @Query(value = "{vendorEmail: '?0'}",count = true)
    int getPayoutsCountByVendorEmail(String vendorEmail);

    @Query(value = "{vendorEmail: '?0'}", sort = "{payoutDate: -1}")
    List<Payout> getPayoutsAllByVendorEmail(String vendorEmail);




}
