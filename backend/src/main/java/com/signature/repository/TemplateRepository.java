package com.signature.repository;

import com.signature.model.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long> {
    List<Template> findByCategory(Template.Category category);
    List<Template> findByIsPro(boolean isPro);
    List<Template> findByCategoryAndIsPro(Template.Category category, boolean isPro);
}