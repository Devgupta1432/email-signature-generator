package com.signature.repository;

import com.signature.model.Template;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TemplateRepository extends MongoRepository<Template, String> {
    List<Template> findByCategory(Template.Category category);
    List<Template> findByIsPro(boolean isPro);
    List<Template> findByCategoryAndIsPro(Template.Category category, boolean isPro);
}