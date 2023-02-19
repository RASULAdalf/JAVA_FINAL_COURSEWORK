package lk.ijse.cmjd95.repo;

import lk.ijse.cmjd95.dto.query_interface.ItemDataInterface;
import lk.ijse.cmjd95.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableMongoRepositories
public interface ItemRepo extends MongoRepository<Item, String> {
    @Query("{itemDescription: {$regex: '?0'}}")
    Page<ItemDataInterface> getAllItemsByDescription(String searchText, Pageable pageable);

    @Query(value = "{itemDescription: {$regex: '?0'}}", count = true)
    int getAllItemsCountByDescription(String searchText);

    @Query("{itemCategory: '?0'}")
    Page<ItemDataInterface> getAllItemsByCategory(String category, Pageable pageable);

    @Query(value = "{itemCategory: '?0'}", count = true)
    int getAllItemsCountByCategory(String category);

    @Query("{specsDocContent: {$regex: '?0'}}")
    Page<ItemDataInterface> getAllItemsBySpecsDocContent(String searchText, Pageable pageable);

    @Query("{specsDocContent: {$regex: '?0'}}")
    int getAllItemsCountBySpecsDocContent(String searchText);
}
