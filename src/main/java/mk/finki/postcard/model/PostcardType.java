package mk.finki.postcard.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "postcard_type")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class PostcardType {

    @Id
    private String name;
    private Integer width;
    private Integer height;
    private Integer numOfImages;
    private String position;

}
