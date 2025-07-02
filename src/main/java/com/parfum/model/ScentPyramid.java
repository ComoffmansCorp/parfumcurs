package com.parfum.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class ScentPyramid {
    @Column(name = "top_notes", columnDefinition = "text[]")
    private String[] topNotes;

    @Column(name = "middle_notes", columnDefinition = "text[]")
    private String[] middleNotes;

    @Column(name = "base_notes", columnDefinition = "text[]")
    private String[] baseNotes;
} 